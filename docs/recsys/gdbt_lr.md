# Facebook 广告点击率预测系统(GDBT+LR)


## 1. 引言：工业级 CTR 预测的统计与工程挑战

广告点击率（Click-Through Rate, CTR）预测是在线广告系统的核心模块。CTR 精度决定广告排序、定价与竞价机制。Facebook 的流量规模导致 CTR 预测模型同时面临：

* **类极度不平衡（CTR ≈ 千分级）**
* **特征维度高（数十万到千万级）**
* **数据新鲜度重要（概念漂移明显）**
* **在线推断需毫秒级延迟**

论文的贡献在于：系统性比较 **GBDT + Logistic Regression（LR）** 混合模型结构、在线学习算法、数据采样策略、特征重要性与工程架构。

## 2. 模型结构：GBDT 作为非线性变换 + LR 做稀疏线性分类

### 2.1 传统 LR 的限制

CTR 预测一般以 LR 作为基础概率模型：

$$
\hat{y} = \sigma(\mathbf{w}^\top \mathbf{x}) = \frac{1}{1 + e^{-\mathbf{w}^\top \mathbf{x}}}
$$

LR 的优点是稳定、高效、可在线学习，但缺乏：

* 特征交叉（高阶组合）
* 非线性边界
* 自动特征选择

因此无法充分挖掘用户 × 广告 × 上下文 的交互模式。

### 2.2 GBDT 的作用：特征空间变换

梯度提升决策树（GBDT）学习一个非线性函数：

$$
f(\mathbf{x}) = \sum_{t=1}^{T} \eta h_t(\mathbf{x})
$$

其中 $(h_t)$ 为树模型，($\eta$) 为 shrinkage。

每棵树将输入映射到一个叶节点（leaf）。论文采用 **Leaf-one-hot Encoding**：

若第 ($t$) 棵树有 ($L_t$) 个叶，则定义稀疏特征：

$$
\mathbf{z}_{t}(\mathbf{x}) \in {0,1}^{L_t}
$$

整个 GBDT 输出被编码成高维的稀疏向量：

$$
\mathbf{z}(\mathbf{x}) = [\mathbf{z}_1(\mathbf{x}),\ldots,\mathbf{z}_T(\mathbf{x})]
$$

### 2.3 组合模型（GBDT → LR）

最终模型：

$$
\hat{y} = \sigma(\mathbf{w}^\top \mathbf{z}(\mathbf{x}))
$$

优势：

1. GBDT 自动学习非线性与高阶交互
2. LR 作为稀疏模型可在线更新权重
3. GBDT 训练不需在线；LR 可以实时学习新数据
4. GBDT 叶子特征稀疏，高效、可哈希、内存友好

**混合结构 NE 大幅优于单独 GBDT 和单独 LR**。

## 3 评价指标：Normalized Cross Entropy（NE）

广告系统必须预测概率而非仅排序，因此需要以交叉熵衡量模型质量。

### 3.1 定义

给定样本集合 ($D={(x_i, y_i)}$)，交叉熵：

$$
H(p,q) = - \frac{1}{|D|}\sum_{i} \left[ y_i \log q(x_i) + (1-y_i)\log(1-q(x_i)) \right]
$$

其中 ($q(x_i)=\hat{y}_i$) 为预测概率。

设基线模型为输出常数 CTR：

$$
p = \frac{1}{|D|}\sum y_i
$$

基线交叉熵：

$$
H(p,p) = -p\log p -(1-p)\log(1-p)
$$

**Normalized Entropy**：

$$
NE = \frac{H(p,q)}{H(p,p)}
$$

NE 越小越好。

**NE 的变化非常敏感，可以检测微弱性能差异**

## 4 数据新鲜度：分布漂移下的训练窗口

### 4.1 训练窗口长度实验

使用不同窗口（1 天、7 天、30 天）训练模型：

* **窗口越近，NE 越低**
* **每日重训明显优于每周**
* **广告系统中的概念漂移（concept drift）非常强**

原因：

* 用户兴趣变化
* 广告创意频繁更迭
* 页面布局改版
* 展示逻辑改变（例如 ranker 有刷新）

结论：**数据越新越好，但全量重训代价极高**。

## 5 在线学习：捕捉最新分布

### 5.1 在线学习的 LR 公式

采用 SGD：

$$
\mathbf{w}_{t+1} = \mathbf{w}_t - \eta_t \nabla L(\mathbf{w}_t)
$$

负对数似然：

$$
\nabla L = (\hat{y}_t - y_t)\mathbf{z}(x_t)
$$

由于 ($\mathbf{z}$) 稀疏，更新高效。

### 5.2 坐标级学习率（per-coordinate learning rate）

设每个特征维度 ($j$) 维护单独学习率：

$$
\eta_{t,j} = \frac{\alpha}{\sqrt{G_{t,j} + \epsilon}}
$$

其中

$$
G_{t,j} = \sum_{k=1}^{t}(g_{k,j})^{2}
$$

类似 **AdaGrad**。

**per-coordinate LR 在 CTR 预测中效果显著优于全局学习率**。

### 5.3 与 BOPR（Bayesian Online Probit Regression）的比较

BOPR 同时学习均值与方差，理论更完善，但需要存储：

* 每个特征的 ($\mu_j$)
* 每个特征的 ($\sigma_j^2$)

导致内存翻倍。

* **BOPR ≈ per-coordinate LR**（在 NE 上几乎持平）
* LR 更易工程实现、内存更少

因此最终在线模型采用 LR。

## 6 在线 Joiner：展示流与点击流的实时对齐

CTR 在线学习必须构造训练样本：每条“展示”要与其是否被点击对应。展示与点击分别来自不同流系统，需要实时 join。

论文提出：

### HashQueue（哈希队列）

* 使用 request\_id → 展示数据
* 点击到达后 通过 request\_id 查找对应展示
* 设置一个等待窗口 (W)（数秒级）

若超过窗口仍未等到点击，则认定该样本是负样本。

### 关键工程点：

* 窗口太大 → 内存暴涨
* 窗口太小 → 点击覆盖率下降（漏掉正样本）

论文提供了点击覆盖率随窗口变化的测量方法，证明在合理窗口下可保证偏差很小。

## 7 特征实验：历史特征 vs 上下文特征

### 7.1 特征重要性（Boosting Feature Importance）

GBDT 的 split 次数可以作为特征重要性：

$$
I_j = \sum_{t=1}^{T}\sum_{\text{splits on }j} \Delta \text{Gain}
$$

论文发现：

**历史类特征贡献最大（CTR、点击数、曝光数等）**
**上下文特征在冷启动场景贡献关键但总体弱一些**

许多 top 特征的 split 贡献集中在非常少的维度（长尾特征大量无贡献）。

## 8 树数量的边际收益递减

论文系统测试不同的 GBDT 树数量（50 到 2000 棵）：

* 前 200–500 棵树贡献最大
* 之后 NE 改善非常小
* 2000 棵树效果提升很有限但推理成本提高数倍

因此在工程上选取 **300–600** 棵树作为折中。

## 9 训练数据采样策略

### 9.1 均匀下采样（Uniform subsampling）

在训练样本数极大时，使用比例抽样。例如使用 10% 样本：

* NE 仅轻微变差
* 训练资源减少 90%

高性价比。

### 9.2 负样本下采样（Negative Downsampling）

CTR ≈ 0.1%（正样本极少），故可对负样本进行强下采样。例如：

$$
q = P(y=0) \to P'(y=0) = \beta q
$$

需要校准预测概率：

$$
\hat{y}_{\text{calibrated}} =
\frac{\hat{y}}{\hat{y} + \frac{1-\hat{y}}{\beta}}
$$

论文发现存在“最佳”负采样率（如 2.5%），过低或过高均会损害性能。

## 10 系统架构

整体系统分三部分：

1. **离线阶段**
   * 构造训练样本
   * 训练 GBDT
   * 提取叶子索引特征
   * 离线训练 LR（warm start）
2. **在线阶段**
   * 实时在线 join（展示流 + 点击流）
   * 在线更新 LR（SGD）
   * 更新参数缓存
3. **推理阶段**
   * 请求到达时先用 GBDT 做 forward（获取叶子特征）
   * 再用 LR 做稀疏点积

这种结构确保：

* 非线性部分在离线训练
* 快速部分在在线持续更新
* 延迟仍可维持在毫秒级




# Wide & Deep 推荐模型

## 摘要

推荐系统作为智能信息分发的核心技术，其本质任务是从海量候选项中，精准地为用户挑选出最有可能感兴趣的内容。传统线性模型具备优秀的“记忆”能力，却难以泛化到未见特征组合；深度神经网络则善于“泛化”，但缺乏对历史共现规律的直接建模。**Wide & Deep 模型**正是为弥补这一结构性鸿沟而生，通过“宽”线性部分捕捉显性共现关系，“深”非线性部分学习潜在语义关联，从而在推荐系统中实现**记忆与泛化的统一**。


## 1. 推荐系统的核心挑战

### 1.1 推荐系统的普适性与复杂性

推荐系统无处不在。从电商首页的个性化商品推荐，到短视频平台的内容流分发，再到广告展示与搜索排序，它们共同构成了数字经济的底层驱动力。

然而，推荐问题的本质复杂性源于数据的**高维稀疏性**与**多样性**：用户、物品、上下文、时间等多模态特征相互作用，形成了海量且非独立同分布（non-IID）的样本分布。


### 1.2 “记忆”与“泛化”的双重需求

在推荐场景中，系统需同时具备两种能力：

- **记忆（Memorization）**：直接学习历史数据中频繁出现的特征组合。  
  例如，当“用户安装了 Netflix”与“曝光 Disney+”在历史上高度共现时，模型应能够复现这一强关联。

- **泛化（Generalization）**：超越训练样本，通过特征的语义关联推理出新的潜在关系。  
  例如，“喜欢科幻电影”的用户可能也会对“太空探索纪录片”感兴趣，即便该组合在训练集中罕见。


### 1.3 传统方法的不足

| 模型类型 | 代表方法 | 优势 | 局限性 |
|-----------|------------|------|--------|
| 广义线性模型 (GLM) | Logistic Regression, FM | 对稀疏特征拟合能力强，易解释 | 无法自动泛化新组合，特征工程成本高 |
| 深度学习模型 | Embedding + MLP | 自动特征学习，强泛化性 | 难以直接捕捉稀疏特征的精确共现关系 |

这种“记忆与泛化”的张力长期制约着推荐系统性能的上限，直到 **Wide & Deep** 模型的提出。


## 2. Wide & Deep 模型架构详解

Wide & Deep 模型最早由 Google 在 2016 年提出（Cheng et al., 2016），应用于 Google Play 应用推荐系统，并取得显著效果。模型整体架构如图所示。

![Wide&Deep模型结构](https://s3.bmp.ovh/imgs/2022/04/27/cfd884b771cd37f7.png)

### 2.1 总体结构

模型通过并行的两条路径处理输入特征：

- **Wide 部分**：使用线性模型捕捉历史中明确的特征交互；
- **Deep 部分**：通过嵌入层与多层感知机 (MLP) 学习高维稀疏特征的非线性组合。

二者的输出在最后一层进行联合，构成预测概率：

$$
P(Y=1 \mid X) = \sigma \left( \mathbf{w}_\text{wide}^\top \mathbf{x}_\text{wide} + \mathbf{w}_\text{deep}^\top \mathbf{a}^{(L)} + b \right)
$$

其中：
-$\sigma(\cdot)$为 Sigmoid 函数；
-$\mathbf{x}_\text{wide}$表示 Wide 部分的输入（特征交叉向量）；
-$\mathbf{a}^{(L)}$为 Deep 部分最后一层的激活输出；
-$\mathbf{w}_\text{wide}, \mathbf{w}_\text{deep}$为对应权重。


### 2.2 Wide 部分：记忆专家

Wide 部分采用**广义线性模型 (GLM)**，目标是直接记忆训练数据中强相关的特征组合关系。

其输出定义为：

$$
y_\text{wide} = \mathbf{w}_\text{wide}^\top [\mathbf{x}, \phi(\mathbf{x})] + b_\text
$$

其中：
-$\mathbf{x}$为原始特征；
-$\phi(\mathbf{x})$为人工设计的交叉特征，例如：

 $$
\phi(\mathbf{x}) = \text{AND}(\text{user\_installed\_app=Netflix}, \text{impression\_app=Disney+})
 $$

- Wide 模型的学习目标是最小化交叉熵损失函数：

 $$
\mathcal{L}_\text{wide} = - \sum_i \left[ y_i \log \hat{y}_i + (1-y_i) \log (1-\hat{y}_i) \right]
 $$

这种线性结构保证了对特定模式的“硬记忆”能力，特别适用于频繁共现的高价值规则。


### 图 2. Wide 部分结构示意图  
> （图表占位：展示线性输入层、特征交叉连接、输出层）


### 2.3 Deep 部分：泛化探索者

Deep 部分由 **Embedding 层 + 多层感知机 (MLP)** 构成，负责从稀疏特征中学习潜在的语义空间。

假设输入的稀疏特征包含若干离散变量：

$$
\mathbf{x}_\text{sparse} = [x_1, x_2, ..., x_K]
$$

每个特征通过嵌入矩阵$\mathbf{E}_k \in \mathbb{R}^{|V_k| \times d}$映射到低维连续空间：

$$
\mathbf{e}_k = \mathbf{E}_k^\top \mathbf{1}_{x_k}
$$

连接所有嵌入后，输入 MLP：

$$
\mathbf{a}^{(0)} = [\mathbf{e}_1, \mathbf{e}_2, ..., \mathbf{e}_K]
$$

MLP 的逐层传播为：

$$
\mathbf{a}^{(l)} = f\left(\mathbf{W}^{(l)} \mathbf{a}^{(l-1)} + \mathbf{b}^{(l)}\right), \quad l = 1, ..., L
$$

其中：
-$f(\cdot)$通常为 ReLU 或 GELU；
-$\mathbf{a}^{(L)}$即 Deep 部分的最终输出，反映了多特征交互的非线性关系。


### 图 3. Deep 部分结构示意图  
> （图表占位：展示稀疏输入→Embedding→连接→多层全连接→输出）


### 2.4 联合优化：协同学习机制

Wide 与 Deep 模块并非独立训练，而是通过**联合目标函数**同步更新参数：

$$
\begin{equation}
\mathcal{L} = - \sum_i \left[ y_i \log \hat{y}_i + (1-y_i) \log (1-\hat{y}_i) \right]
\end{equation}
$$

联合训练的优势在于：
- Wide 部分负责捕捉强规则性特征；
- Deep 部分负责学习潜在非线性；
- 两者梯度在同一目标下互补，形成自适应的记忆-泛化平衡。


## 3. 模型优势与发展演化

### 3.1 优势分析

| 维度 | Wide & Deep 优势 |
|------|------------------|
| 记忆能力 | Wide 部分有效捕捉高频组合特征 |
| 泛化能力 | Deep 部分通过非线性映射挖掘隐含关系 |
| 可扩展性 | 可平滑扩展至 DeepFM、DCN 等后续架构 |
| 工程落地 | TensorFlow 提供成熟实现与高效推理支持 |


### 3.2 模型局限与改进方向

| 问题 | 典型改进模型 | 改进策略 |
|------|----------------|----------|
| 交叉特征依赖人工设计 | DeepFM | 用 FM 替代 Wide 自动学习交叉 |
| 用户兴趣单一静态 | DIN, DIEN | 引入注意力建模动态兴趣 |
| 特征交互层面有限 | AutoInt, DCN | 使用自注意力机制增强高阶交互 |


### 3.3 业界影响

自 Google Play 首次部署以来，Wide & Deep 模型已成为业界推荐系统的事实标准架构，被广泛应用于：
- 搜索排序与广告点击率预测；
- 内容推荐与个性化分发；
- 电商与金融领域的用户行为建模。


## 4. 总结与展望

Wide & Deep 模型通过联合线性与非线性结构，实现了推荐系统“记忆”与“泛化”的兼得。其核心思想为后续一系列模型（如 DeepFM、xDeepFM、AutoInt 等）奠定了统一的框架基础。

未来的演化方向包括：
1. **自动化特征交叉**：减少人工设计，提升泛化鲁棒性；
2. **多任务学习**：同时优化点击率、转化率、停留时长等多目标；
3. **动态兴趣建模**：捕捉时序行为的语义演化；
4. **生成式AI融合**：利用大语言模型（LLM）进行特征生成与用户意图解释。


## 5. 参考文献

1. Heng-Tze Cheng et al., *Wide & Deep Learning for Recommender Systems*, Google Research, 2016.  
2. Guo et al., *DeepFM: A Factorization-Machine based Neural Network for CTR Prediction*, IJCAI 2017.  
3. Zhou et al., *Deep Interest Network for Click-Through Rate Prediction*, KDD 2018.  
4. TensorFlow Official Guide: [https://www.tensorflow.org/recommenders](https://www.tensorflow.org/recommenders)


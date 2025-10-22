---
title: RecSys
---

<style>
body {
  background: #f9fafc;
}
.category-container {
  font-family: "Segoe UI", Arial, sans-serif;
  color: #333;
  line-height: 1.6;
  padding: 40px 20px;
  max-width: 800px;
  margin: 0 auto;
}

.category-container h1 {
  text-align: center;
  color: #222;
  margin-bottom: 40px;
}

.topic {
  margin-bottom: 50px;
}

.topic-title {
  font-size: 1.6em;
  font-weight: bold;
  color: #007bff;
  border-left: 6px solid #007bff;
  padding-left: 10px;
  margin-bottom: 20px;
}

.article-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.article {
  background: #fff;
  border-radius: 10px;
  padding: 14px 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  transition: 0.2s ease;
}

.article:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.article-title {
  font-size: 1.05em;
  font-weight: 600;
  color: #333;
  margin-bottom: 4px;
}

.article-title a {
  text-decoration: none;
  color: inherit;
}

.article-title a:hover {
  color: #007bff;
}

.article-meta {
  font-size: 0.9em;
  color: #777;
}

@media (max-width: 600px) {
  .category-container {
    padding: 20px;
  }
  .topic-title {
    font-size: 1.3em;
  }
}
</style>

<div class="category-container">
  <h1>博客分类列表</h1>

  <!-- Topic 1 -->
  <section class="topic">
    <div class="topic-title">机器学习</div>
    <div class="article-list">
      <div class="article">
        <div class="article-meta">2025-10-20</div>
        <div class="article-title"><a href="/ml/gradient-descent">理解梯度下降算法：从直觉到实现</a></div>
      </div>

      <div class="article">
        <div class="article-meta">2025-10-10</div>
        <div class="article-title"><a href="/ml/feature-engineering">特征工程在机器学习中的作用</a></div>
      </div>
    </div>
  </section>

  <!-- Topic 2 -->
  <section class="topic">
    <div class="topic-title">推荐系统</div>
    <div class="article-list">
      <div class="article">
        <div class="article-meta">2025-09-30</div>
        <div class="article-title"><a href="/recsys/gnn">图神经网络在推荐系统中的应用</a></div>
      </div>

      <div class="article">
        <div class="article-meta">2025-09-15</div>
        <div class="article-title"><a href="/recsys/ranking">召回与排序：推荐系统的两阶段架构</a></div>
      </div>
    </div>
  </section>

  <!-- Topic 3 -->
  <section class="topic">
    <div class="topic-title">大模型</div>
    <div class="article-list">
      <div class="article">
        <div class="article-meta">2025-08-25</div>
        <div class="article-title"><a href="/llm/transformer-evolution">从Transformer到GPT：架构演进解析</a></div>
      </div>
    </div>
  </section>
</div>

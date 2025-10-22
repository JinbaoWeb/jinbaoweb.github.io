
  <style>

    h1 {
      text-align: center;
      color: #222;
      margin-bottom: 40px;
    }

    .topic {
      margin-bottom: 50px;
      max-width: 800px;
      margin-left: auto;
      margin-right: auto;
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
      body {
        padding: 20px;
      }
      .topic-title {
        font-size: 1.3em;
      }
    }
  </style>
<div class="category-container">
  <section class="topic">
    <div class="topic-title">召回</div>
    <div class="article-list">
      <div class="article">
        <div class="article-meta">2025-09-29</div>
        <div class="article-title"><a href="/recsys/cf">协同过滤算法</a></div>
      </div>

      <div class="article">
        <div class="article-meta">2025-09-25</div>
        <div class="article-title"><a href="/recsys/fm">FM因子分解机</a></div>
      </div>
    </div>
  </section>

  <!-- Topic 2 -->
  <section class="topic">
    <div class="topic-title">精排</div>
    <div class="article-list">
      <div class="article">
        <div class="article-meta">2025-09-25</div>
        <div class="article-title"><a href="/recsys/mf">推荐系统的矩阵分解</a></div>
      </div>

      <div class="article">
        <div class="article-meta">2025-09-15</div>
        <div class="article-title"><a href="/recsys/deepfm">深度模型DeepFM模型</a></div>
      </div>
    </div>
  </section>

  <!-- Topic 3 -->
  <section class="topic">
    <div class="topic-title">多目标算法</div>
    <div class="article-list">
      <div class="article">
        <div class="article-meta">2025-09-25</div>
        <div class="article-title"><a href="/recsys/mmoe">多任务模型MMoE</a></div>
      </div>

      <div class="article">
        <div class="article-meta">2025-09-15</div>
        <div class="article-title"><a href="#">深度模型DeepFM模型</a></div>
      </div>
    </div>
  </section>

  <!-- Topic 4 -->
  <section class="topic">
    <div class="topic-title">序列推荐</div>
    <div class="article-list">
      <div class="article">
        <div class="article-meta">2025-09-25</div>
        <div class="article-title"><a href="#">Transformer4rec</a></div>
      </div>

      <div class="article">
        <div class="article-meta">2025-09-15</div>
        <div class="article-title"><a href="#">深度模型DeepFM模型</a></div>
      </div>
    </div>
  </section>
</div>

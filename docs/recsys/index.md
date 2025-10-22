
<style>
.blog-timeline {
  display: flex;
  flex-direction: column;
  gap: 32px;
}
.category-section {
  border-left: 3px solid #42b983;
  padding-left: 16px;
  position: relative;
}
.category-section::before {
  content: attr(data-category);
  position: absolute;
  left: -120px;
  top: 0;
  font-weight: bold;
  color: #42b983;
}
.timeline-item {
  position: relative;
  margin: 12px 0 12px 20px;
}
.timeline-item::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 6px;
  width: 10px;
  height: 10px;
  background-color: #42b983;
  border-radius: 50%;
}
.timeline-item a {
  font-weight: bold;
  color: #333;
  text-decoration: none;
}
.timeline-item a:hover {
  text-decoration: underline;
}
.timeline-item .date {
  font-size: 0.85em;
  color: #666;
  margin-left: 8px;
}
</style>

<div class="blog-timeline">
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

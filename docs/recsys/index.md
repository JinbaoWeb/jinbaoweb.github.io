# 博客列表

<div class="blog-list">

  <div class="post-item">
    <a href="/basics/cf" class="title">协同过滤原理与实现</a>
    <p class="meta">2025-09-10</p>
    <p class="desc">介绍 UserCF 与 ItemCF 的基本思路与实现。</p>
  </div>

  <div class="post-item">
    <a href="/basics/mf" class="title">矩阵分解在推荐系统中的应用</a>
    <p class="meta">2025-09-12</p>
    <p class="desc">隐语义模型、SVD 与 ALS 在推荐系统中的使用。</p>
  </div>

  <div class="post-item">
    <a href="/models/deepfm" class="title">DeepFM 模型详解</a>
    <p class="meta">2025-09-15</p>
    <p class="desc">结合 FM 与 DNN 的推荐模型，兼顾记忆与泛化能力。</p>
  </div>

</div>

<style>
.blog-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 2rem;
}

.post-item {
  padding: 1rem;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  transition: box-shadow 0.2s;
  background: #fff;
}

.post-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.post-item .title {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--vp-c-brand);
  text-decoration: none;
}

.post-item .title:hover {
  text-decoration: underline;
}

.post-item .meta {
  font-size: 0.9rem;
  color: gray;
  margin: 0.2rem 0 0.5rem 0;
}

.post-item .desc {
  font-size: 1rem;
  color: #555;
  margin: 0;
}
</style>

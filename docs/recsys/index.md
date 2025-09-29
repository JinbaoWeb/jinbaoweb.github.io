# 推荐算法

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

  <div class="category-section" data-category="推荐算法">
    <div class="timeline-item">
      <a href="/blog/post1.html">文章标题 A</a>
      <span class="date">2025-09-29</span>
    </div>
    <div class="timeline-item">
      <a href="/blog/post4.html">文章标题 B</a>
      <span class="date">2025-09-25</span>
    </div>
  </div>

  <div class="category-section" data-category="机器学习">
    <div class="timeline-item">
      <a href="/blog/post2.html">文章标题 C</a>
      <span class="date">2025-09-28</span>
    </div>
    <div class="timeline-item">
      <a href="/blog/post5.html">文章标题 D</a>
      <span class="date">2025-09-22</span>
    </div>
  </div>

  <div class="category-section" data-category="算法工程">
    <div class="timeline-item">
      <a href="/blog/post3.html">文章标题 E</a>
      <span class="date">2025-09-27</span>
    </div>
  </div>

</div>

# 推荐算法

<div class="features">

  <div class="feature">
    <h2>召回</h2>
    <ul>
      <li><a href="/recall/cf.html">协同过滤</a></li>
      <li><a href="/recall/embedding.html">向量召回</a></li>
      <li><a href="/recall/graph.html">图召回</a></li>
    </ul>
  </div>

  <div class="feature">
    <h2>排序</h2>
    <ul>
      <li><a href="/rank/lr.html">逻辑回归</a></li>
      <li><a href="/rank/gbdt.html">GBDT + LR</a></li>
      <li><a href="/rank/deepfm.html">DeepFM</a></li>
    </ul>
  </div>

  <div class="feature">
    <h2>序列推荐</h2>
    <ul>
      <li><a href="/sequence/gru4rec.html">GRU4Rec</a></li>
      <li><a href="/sequence/sasrec.html">SASRec</a></li>
      <li><a href="/sequence/bert4rec.html">BERT4Rec</a></li>
    </ul>
  </div>

  <div class="feature">
    <h2>其他方向</h2>
    <ul>
      <li><a href="/exploration/rl.html">强化学习推荐</a></li>
      <li><a href="/exploration/multi_agent.html">多智能体推荐</a></li>
      <li><a href="/exploration/mm.html">多模态推荐</a></li>
    </ul>
  </div>

</div>

<style>
.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.2rem;
  margin-top: 2rem;
}
.feature {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  padding: 1.2rem;
  background: #fafafa;
  transition: box-shadow 0.2s ease;
}
.feature:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}
.feature h2 {
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
}
.feature ul {
  list-style: none;
  padding-left: 0;
}
.feature li {
  margin: 0.4rem 0;
}
.feature a {
  text-decoration: none;
  color: #3eaf7c;
}
.feature a:hover {
  text-decoration: underline;
}
</style>

<template>
  <div class="vp-container">
    <header class="vp-header">
      <div class="logo">
        <div class="mark">ML</div>
        <div>
          <h1>深度学习笔记</h1>
          <div class="sub">机器学习 · 推荐算法 · 大模型</div>
        </div>
      </div>

      <nav class="nav">
        <router-link class="nav-link" to="/">文章</router-link>
        <router-link class="nav-link" to="/topics/">专题</router-link>
        <router-link class="nav-link" to="/projects/">项目</router-link>
        <router-link class="nav-link" to="/about/">关于</router-link>
        <a class="cta" href="#subscribe">订阅</a>
      </nav>
    </header>

    <!-- Home hero only on root -->
    <main>
      <section v-if="isHome" class="hero">
        <div class="hero-left">
          <h2>由数据与数学驱动的工程笔记<br/>专注机器学习、深度学习与推荐系统</h2>
          <p class="muted">实战笔记、算法推导、工程化落地、大模型探索 — 面向研究与生产环境的可复现内容。</p>
          <div class="hero-cta">
            <router-link class="pill" to="/posts/">最新文章</router-link>
            <router-link class="pill" to="/projects/">项目与工具</router-link>
            <router-link class="pill" to="/topics/">专题合集</router-link>
          </div>

          <div class="hot-tags">
            <div class="muted">热门标签：</div>
            <div class="tags">
              <span class="tag-pill">Transformer</span>
              <span class="tag-pill">推荐系统</span>
              <span class="tag-pill">大模型工程</span>
              <span class="tag-pill">图神经网络</span>
            </div>
          </div>
        </div>

        <aside class="hero-right">
          <div class="hero-card">
            <div class="top">
              <div class="tag">热门系列</div>
              <div class="meta">共 42 篇文章</div>
            </div>
            <div class="big-title">从零开始的推荐系统实战</div>
            <div class="meta">本系列覆盖特征工程、召回、排序、实验设计与在线部署。</div>
            <div class="hero-foot">
              <div class="meta">最新更新：<strong>2025-09-29</strong></div>
              <div class="meta">阅读时长 12 min</div>
            </div>
          </div>
        </aside>
      </section>

      <!-- If not home, render page content here -->
      <section v-if="!isHome" class="page-slot">
        <slot />
      </section>

      <!-- Home sections (static placeholders; see notes to connect dynamic data) -->
      <section v-if="isHome" class="features">
        <div class="card"><h3>研究笔记</h3><p class="muted">算法推导、重要论文解读与复现要点（含代码片段与落地建议）。</p></div>
        <div class="card"><h3>工程实践</h3><p class="muted">训练流水线、分布式训练、模型压缩、上线与监控方案，聚焦可复现与可运维。</p></div>
        <div class="card"><h3>推荐系统</h3><p class="muted">召回/排序/候选集构建、特征工程与A/B实验设计的落地经验。</p></div>
        <div class="card"><h3>大模型与LLM</h3><p class="muted">Prompt工程、检索增强生成（RAG）、微调与推理优化实践。</p></div>
      </section>

      <section v-if="isHome" id="posts" class="section">
        <h3>最新文章</h3>
        <div class="posts">
          <article class="post" v-for="post in posts" :key="post.title">
            <div class="title">{{ post.title }}</div>
            <div class="meta">{{ post.date }} · 阅读 {{ post.read }}</div>
            <p class="excerpt">{{ post.excerpt }}</p>
            <div class="tags">
              <span class="tag-pill" v-for="t in post.tags" :key="t">{{ t }}</span>
            </div>
          </article>
        </div>
      </section>

      <section v-if="isHome" id="topics" class="section topics">
        <div class="topics-list">
          <div class="card"><h4>模型压缩与推理优化</h4><p class="muted">蒸馏、量化与低秩分解的实战经验与性能对比。</p></div>
          <div class="card"><h4>在线与离线实验设计</h4><p class="muted">如何建立可重复、可测量的实验体系来评估推荐算法效果。</p></div>
          <div class="card"><h4>大模型工程化</h4><p class="muted">数据管道、检索系统与多阶段推理的设计模式。</p></div>
          <div class="card"><h4>自动化特征平台</h4><p class="muted">构建特征仓库、特征依赖与回溯能力的工程实践。</p></div>
        </div>

        <aside class="aside">
          <h4>订阅与更新</h4>
          <div class="muted">获取最新文章与项目更新（每月邮件汇总）。</div>
          <div class="subscribe" id="subscribe">
            <input v-model="email" placeholder="邮箱地址" />
            <button @click="doSubscribe">订阅</button>
          </div>

          <div class="quick-links">
            <h4>快速入口</h4>
            <router-link class="nav-link" to="/tools/">推荐系统工具链</router-link>
            <router-link class="nav-link" to="/templates/">大模型实验模板</router-link>
            <router-link class="nav-link" to="/papers/">论文笔记</router-link>
          </div>
        </aside>
      </section>

    </main>

    <footer class="vp-footer">© 2025 深度学习笔记 · Built with ❤ · 文章以原创或整理为主，转载请标注来源。</footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/index.html')

// placeholder posts: replace with Site data in production (see notes)
const posts = ref([
  { title: '大规模推荐中的特征工程实战', date: '2025-09-20', read: '1.2k', excerpt: '从数据接入、稀疏特征处理到高效的 embedding 表设计，包含 Spark 与在线服务示例代码。', tags: ['推荐','特征工程'] },
  { title: 'Transformer 的参数高效微调方法比较', date: '2025-09-12', read: '980', excerpt: 'LoRA、Adapter、Prompt-Tuning 等微调方法的原理、优劣与工程实现要点。', tags: ['大模型','微调'] },
  { title: '图神经网络在推荐系统中的应用探索', date: '2025-08-30', read: '870', excerpt: '构图、采样策略与可扩展训练的工程考量，以及示例代码与实验结果。', tags: ['GNN','推荐'] }
])

const email = ref('')
function doSubscribe(){
  if(!email.value) { alert('请先填写邮箱地址'); return }
  alert('已订阅：' + email.value + '\n已加入邮件列表（模拟）')
  email.value = ''
}
</script>

<style scoped>
:root{ --bg:#0f1724; --muted:#94a3b8; --accent1:#6ee7b7; --accent2:#7c3aed }
.vp-container{max-width:1200px;margin:32px auto;padding:0 24px;color:#e6eef8;font-family:Inter,Arial,\5b8b\4f53,\5b8b\4f53}
.vp-header{display:flex;align-items:center;justify-content:space-between;padding:18px 0}
.logo{display:flex;align-items:center;gap:12px}
.mark{width:48px;height:48px;border-radius:10px;background:linear-gradient(135deg,var(--accent1),var(--accent2));display:flex;align-items:center;justify-content:center;color:#072027;font-weight:700;box-shadow:0 8px 30px rgba(124,58,237,0.18)}
.logo h1{font-size:18px;margin:0}
.logo .sub{font-size:12px;color:var(--muted)}
.nav{display:flex;gap:16px;align-items:center}
.nav-link{padding:8px 12px;border-radius:999px;font-weight:600;color:var(--muted)}
.nav-link:hover{color:var(--accent1);background:rgba(255,255,255,0.03)}
.cta{padding:8px 14px;border-radius:12px;background:linear-gradient(90deg,var(--accent1),var(--accent2));color:#022; font-weight:700}

.hero{display:grid;grid-template-columns:1fr 420px;gap:28px;align-items:center;margin-top:32px}
.hero-left h2{font-size:48px;margin:0 0 12px;line-height:1.02}
.muted{color:var(--muted)}
.pill{padding:10px 14px;border-radius:999px;background:rgba(255,255,255,0.03);font-weight:600}
.hero-right{height:320px;border-radius:20px;background:linear-gradient(135deg, rgba(124,58,237,0.14), rgba(110,231,183,0.06));display:flex;align-items:center;justify-content:center;box-shadow:0 30px 80px rgba(7,18,36,0.6)}
.hero-card{width:86%;height:86%;border-radius:14px;background:linear-gradient(180deg,#071826, #0b1b2a);display:flex;flex-direction:column;padding:20px;gap:12px}
.tag{background:rgba(255,255,255,0.03);padding:6px 10px;border-radius:999px;font-weight:700;color:var(--muted)}
.big-title{font-size:22px;font-weight:700}
.hero-card .meta{color:var(--muted);font-size:13px}
.features{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-top:36px}
.card{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border-radius:12px;padding:18px;min-height:110px}
.section{margin-top:44px}
.posts{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}
.post{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border-radius:12px;padding:14px;min-height:140px;display:flex;flex-direction:column;gap:10px}
.post .meta{font-size:13px;color:var(--muted)}
.tag-pill{background:rgba(255,255,255,0.03);padding:6px 8px;border-radius:999px;font-size:12px;color:var(--muted)}
.aside{background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));border-radius:12px;padding:18px}
.subscribe{display:flex;gap:8px;margin-top:12px}
.subscribe input{flex:1;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.03);background:transparent;color:inherit}
.subscribe button{padding:10px 12px;border-radius:10px;border:none;background:var(--accent1);font-weight:700}
.vp-footer{margin:64px 0 120px;color:var(--muted);text-align:center}

@media (max-width:1000px){.hero{grid-template-columns:1fr}.features{grid-template-columns:repeat(2,1fr)}.posts{grid-template-columns:repeat(2,1fr)}.hero-left h2{font-size:36px}}
@media (max-width:640px){.features{grid-template-columns:1fr}.posts{grid-template-columns:1fr}.vp-header{padding:12px 0}.logo h1{font-size:16px}}
</style>

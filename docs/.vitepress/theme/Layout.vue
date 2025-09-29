<template>
  <!-- Render differently depending on route: if homepage, show custom homepage content inside DefaultTheme Layout's slot; otherwise render DefaultTheme unchanged (pass through page slot) -->
  <component :is="DefaultLayout">
    <template #default>
      <div v-if="isHome">
        <div class="vp-container">
          <!-- Homepage hero + sections -->
          <main>
            <section class="hero">
              <div class="hero-left">
                <h2 v-html="cfg.heroTitle"></h2>
                <p class="muted">{{ cfg.heroSubtitle }}</p>

                <div class="hero-cta">
                  <a class="pill" :href="cfg.ctaLinks.posts">{{ cfg.ctaLabels.posts }}</a>
                  <a class="pill" :href="cfg.ctaLinks.projects">{{ cfg.ctaLabels.projects }}</a>
                  <a class="pill" :href="cfg.ctaLinks.topics">{{ cfg.ctaLabels.topics }}</a>
                </div>

                <div class="hot-tags">
                  <div class="muted">热门标签：</div>
                  <div class="tags">
                    <span v-for="t in cfg.hotTags" :key="t" class="tag-pill">{{ t }}</span>
                  </div>
                </div>
              </div>

              <aside class="hero-right">
                <div class="hero-card">
                  <div class="top">
                    <div class="tag">热门系列</div>
                    <div class="meta">{{ cfg.seriesCountText }}</div>
                  </div>
                  <div class="big-title">{{ cfg.featureSeries.title }}</div>
                  <div class="meta">{{ cfg.featureSeries.desc }}</div>
                  <div class="hero-foot">
                    <div class="meta">最新更新：<strong>{{ cfg.featureSeries.updated }}</strong></div>
                  </div>
                </div>
              </aside>
            </section>

            <!-- Latest posts -->
            <section id="posts" class="section">
              <h3>最新文章</h3>
              <div class="posts">
                <article class="post" v-for="p in posts" :key="p.title">
                  <div class="title">{{ p.title }}</div>
                  <div class="meta">{{ p.date }} · 阅读 {{ p.read || '—' }}</div>
                  <p class="excerpt">{{ p.excerpt }}</p>
                  <div class="tags">
                    <span class="tag-pill" v-for="t in p.tags || []" :key="t">{{ t }}</span>
                  </div>
                </article>
              </div>
            </section>

            <!-- Topics + sidebar -->
            <section id="topics" class="section topics">
              <div class="topics-list">
                <div v-for="topic in cfg.topics" :key="topic.title" class="card">
                  <h4>{{ topic.title }}</h4>
                  <p class="muted">{{ topic.desc }}</p>
                </div>
              </div>

              <aside class="aside">
                <h4>订阅与更新</h4>
                <div class="muted">获取最新文章与项目更新（每月邮件汇总）。</div>
                <div class="subscribe" id="subscribe">
                  <input v-model="email" placeholder="邮箱地址" />
                  <button @click="doSubscribe">订阅</button>
                </div>

                <div class="quick-links" style="margin-top:18px">
                  <h4>快速入口</h4>
                  <div v-for="link in cfg.quickLinks" :key="link.text" style="margin-top:8px">
                    <a :href="link.href" class="nav-link">{{ link.text }}</a>
                  </div>
                </div>
              </aside>
            </section>

          </main>

          <footer class="vp-footer">{{ cfg.footerText }}</footer>
        </div>
      </div>

      <!-- Non-home pages: render DefaultTheme's slot exactly as-is to avoid changing other pages -->
      <template v-else>
        <slot />
      </template>
    </template>
  </component>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import DefaultTheme from 'vitepress/theme'
import { useRoute, useData } from 'vitepress'

// Use DefaultTheme.Layout when available
const DefaultLayout = DefaultTheme && DefaultTheme.Layout ? DefaultTheme.Layout : DefaultTheme

const route = useRoute()
const isHome = computed(() => route.path === '/' || route.path === '/index.html')

const { site } = useData()
const themeConfig = (site && site.value && site.value.themeConfig) ? site.value.themeConfig : {}

const defaults = {
  siteTitle: '深度学习笔记',
  siteTagline: '机器学习 · 推荐算法 · 大模型',
  showHome: true,
  heroTitle: '由数据与数学驱动的工程笔记<br/>专注机器学习、深度学习与推荐系统',
  heroSubtitle: '实战笔记、算法推导、工程化落地、大模型探索 — 面向研究与生产环境的可复现内容。',
  hotTags: ['Transformer','推荐系统','大模型工程','GNN'],
  ctaText: '订阅',
  ctaLinks: { posts: '/posts/', projects: '/projects/', topics: '/topics/' },
  ctaLabels: { posts: '最新文章', projects: '项目与工具', topics: '专题合集' },
  seriesCountText: '共 42 篇文章',
  featureSeries: { title: '从零开始的推荐系统实战', desc: '本系列覆盖特征工程、召回、排序、实验设计与在线部署。', updated: '2025-09-29' },
  topics: [
    { title: '模型压缩与推理优化', desc: '蒸馏、量化与低秩分解的实战经验与性能对比。' },
    { title: '在线与离线实验设计', desc: '如何建立可重复、可测量的实验体系来评估推荐算法效果。' }
  ],
  quickLinks: [
    { text: '推荐系统工具链', href: '/tools/' },
    { text: '大模型实验模板', href: '/templates/' },
    { text: '论文笔记', href: '/papers/' }
  ],
  footerText: '© 2025 深度学习笔记 · Built with ❤ · 文章以原创或整理为主，转载请标注来源。',
  posts: [],
  postsJson: ''
}

const cfg = Object.assign({}, defaults, themeConfig || {})
const posts = ref(cfg.posts && cfg.posts.length ? cfg.posts : [])

onMounted(async () => {
  try {
    if ((!posts.value || posts.value.length === 0) && cfg.postsJson && typeof window !== 'undefined') {
      const res = await fetch(cfg.postsJson)
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) posts.value = data
      }
    }
  } catch (e) {
    // ignore
  }
})

const email = ref('')
function doSubscribe(){
  if(!email.value){ alert('请先填写邮箱地址'); return }
  alert('已订阅：' + email.value + '
已加入邮件列表（模拟）')
  email.value = ''
}
</script>

<style scoped>
:root{ --primary:#7c3aed; --muted:#94a3b8; --accent1:#6ee7b7; --accent2:#7c3aed }
.vp-container{max-width:1200px;margin:32px auto;padding:0 24px;color:#e6eef8;font-family:Inter,Arial,"PingFang SC",sans-serif}
.hero{display:grid;grid-template-columns:1fr 420px;gap:28px;align-items:center;margin-top:32px}
.muted{color:var(--muted)}
.pill{padding:10px 14px;border-radius:999px;background:rgba(255,255,255,0.03);font-weight:600}
.hero-right{height:320px;border-radius:20px;background:linear-gradient(135deg, rgba(124,58,237,0.14), rgba(110,231,183,0.06));display:flex;align-items:center;justify-content:center;box-shadow:0 30px 80px rgba(7,18,36,0.6)}
.hero-card{width:86%;height:86%;border-radius:14px;background:linear-gradient(180deg,#071826, #0b1b2a);display:flex;flex-direction:column;padding:20px;gap:12px}
.tag{background:rgba(255,255,255,0.03);padding:6px 10px;border-radius:999px;font-weight:700;color:var(--muted)}
.big-title{font-size:22px;font-weight:700}
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
@media (max-width:1000px){.hero{grid-template-columns:1fr}.posts{grid-template-columns:repeat(2,1fr)}.hero-left h2{font-size:36px}}
@media (max-width:640px){.features{grid-template-columns:1fr}.posts{grid-template-columns:1fr}.vp-header{padding:12px 0}.logo h1{font-size:16px}}
</style>

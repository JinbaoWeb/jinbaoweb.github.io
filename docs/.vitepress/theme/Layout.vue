<template>
  <div>
    <!-- 保留原来的内容 -->
    <Content />

    <!-- 首页文章列表 -->
    <div v-if="isHome" class="articles-list">
      <h2>所有文章</h2>
      <div v-for="(articles, category) in groupedArticles" :key="category">
        <h3>{{ category }}</h3>
        <ul>
          <li v-for="a in articles" :key="a.path">
            <a :href="a.path">{{ a.title }}</a>
            <small>({{ formatDate(a.gitTime) }})</small>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vitepress'

// 当前路由
const route = useRoute()
const isHome = computed(() => route.path === '/')

// 元数据
const articles = ref([])

// 加载 meta.json
onMounted(async () => {
  try {
    const res = await fetch('/.vitepress/meta.json')
    articles.value = await res.json()
  } catch (e) {
    console.error('加载 meta.json 失败', e)
  }
})

// 按分类分组
const groupedArticles = computed(() => {
  return articles.value.reduce((acc, item) => {
    const cat = item.category || 'root'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})
})

// 格式化时间
function formatDate(time) {
  if (!time) return ''
  return new Date(time).toLocaleDateString()
}
</script>

<style>
.articles-list h2 { margin-top: 2rem; }
.articles-list h3 { margin-top: 1rem; }
.articles-list ul { list-style: disc; margin-left: 1.5rem; }
.articles-list small { color: #888; margin-left: 0.5rem; }
</style>

<script setup>
import DefaultLayout from 'vitepress/theme-default/Layout.vue'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const articles = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/.vitepress/meta.json')
    articles.value = await res.json()

    // 对所有文章按 gitTime 倒序排序（最新在前）
    articles.value.sort((a, b) => {
      const timeA = a.gitTime ? new Date(a.gitTime).getTime() : 0
      const timeB = b.gitTime ? new Date(b.gitTime).getTime() : 0
      return timeB - timeA
    })
  } catch (e) {
    console.error('加载 meta.json 失败', e)
  }
})

// 按分类分组，同时保证分类内部文章按时间倒序
const groupedArticles = computed(() => {
  return articles.value.reduce((acc, item) => {
    const cat = item.category || 'root'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(item)
    return acc
  }, {})
})

function formatDate(time) {
  if (!time) return ''
  return new Date(time).toLocaleDateString()
}
</script>

<template>
  <!-- 保留默认主题布局 -->
  <DefaultLayout>
    <template #default>
      <slot /> <!-- 原本 Markdown 内容 -->
      <div v-if="isHome" class="articles-list">
        <h2>最新文章</h2>
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
    </template>
  </DefaultLayout>
</template>

<style>
.articles-list h2 { margin-top: 2rem; }
.articles-list h3 { margin-top: 1rem; }
.articles-list ul { list-style: disc; margin-left: 1.5rem; }
.articles-list small { color: #888; margin-left: 0.5rem; }
</style>

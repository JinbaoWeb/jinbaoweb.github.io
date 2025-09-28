<template>
  <div>
    <slot /> <!-- 渲染默认主题内容 -->

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
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vitepress'

const route = useRoute()
const isHome = computed(() => route.path === '/')
const articles = ref([])

onMounted(async () => {
  try {
    const res = await fetch('/.vitepress/meta.json')
    articles.value = await res.json()
    articles.value.sort((a, b) => {
      const timeA = a.gitTime ? new Date(a.gitTime).getTime() : 0
      const timeB = b.gitTime ? new Date(b.gitTime).getTime() : 0
      return timeB - timeA
    })
  } catch (e) {
    console.error('加载 meta.json 失败', e)
  }
})

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

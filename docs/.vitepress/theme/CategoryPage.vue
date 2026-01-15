<!-- 
  自定义分类文章列表页布局
  用于 docs/<category>/index.md 的 layout: CategoryPage
-->
<template>
  <div class="VPDoc">
    <div class="container">
      <header class="category-header">
        <h1>{{ categoryDisplayName }}</h1>
        <p v-if="postCount > 0" class="post-count">
          共 {{ postCount }} 篇文章
        </p>
      </header>

      <ul v-if="postCount > 0" class="post-list">
        <li v-for="post in sortedPosts" :key="post.link" class="post-item">
          <a :href="post.link" class="post-title">{{ post.title }}</a>
          <time class="post-date">{{ formatDate(post.date) }}</time>
        </li>
      </ul>

      <div v-else class="empty-state">
        <p>🚧 该分类下暂无文章。</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useData } from 'vitepress'


// ====== 数据获取 ======
const { frontmatter, theme, site, page } = useData()
const category = frontmatter.value.category

// 安全防护：如果 category 不存在，显示错误信息（开发时有用）
if (!category) {
  console.error('[CategoryPage] Missing "category" in frontmatter of index.md')
}

// 创建响应式数据
const metadata = ref(null)

// 监听 theme 变化
watch(() => theme.value, (newTheme) => {
  if (newTheme && newTheme.metadata) {
    metadata.value = newTheme.metadata
    console.log('获取到 metadata:', metadata.value)
  }
}, { immediate: true })

// ====== 文章过滤与排序 ======
const postsInCategory = metadata.articles?.filter(
  (post) => post.category === category
) || []

const sortedPosts = [...postsInCategory].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
)

const postCount = sortedPosts.length

// ====== 显示名称（可扩展为映射表） ======
// 当前直接使用 category 字段，未来可替换为中文映射
const categoryDisplayName = category || '未分类'

// ====== 工具函数 ======
function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

<style scoped>
.container {
  max-width: 780px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.category-header {
  margin: 2rem 0 1.5rem;
  text-align: center;
}

.category-header h1 {
  font-size: 2rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-bottom: 0.5rem;
}

.post-count {
  color: var(--vp-c-text-2);
  font-size: 1rem;
}

.post-list {
  list-style: none;
  padding: 0;
}

.post-item {
  margin: 1.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.post-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--vp-c-brand);
  text-decoration: none;
  transition: color 0.25s;
}

.post-title:hover {
  color: var(--vp-c-brand-dark);
  text-decoration: underline;
}

.post-date {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
  margin-top: 0.25rem;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--vp-c-text-2);
  font-style: italic;
}

</style>





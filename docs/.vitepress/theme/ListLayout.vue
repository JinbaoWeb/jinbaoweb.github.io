<script setup>
import DefaultTheme from 'vitepress/theme'
import { data as posts } from './posts.data.mjs'
</script>

<template>
  <DefaultTheme.Layout>
    <template #content>
      <div class="list-container">
        <h1 class="title">📚 文章列表</h1>
        <ul class="list">
          <li v-for="post in posts" :key="post.link">
            <a :href="post.link" class="item">
              <div class="item-title">{{ post.title }}</div>
              <div class="item-date">{{ post.date }}</div>
            </a>
          </li>
        </ul>
      </div>
    </template>
  </DefaultTheme.Layout>
</template>

<style scoped>
.list-container {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem 1rem;
}
.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}
.list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.item {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text);
  text-decoration: none;
  transition: color 0.2s;
}
.item:hover {
  color: var(--vp-c-brand);
}
.item-date {
  font-size: 0.85rem;
  color: var(--vp-c-text-soft);
}
</style>


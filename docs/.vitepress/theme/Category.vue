<script setup>
import { inject } from "vue";
import { useData } from "vitepress";

const { page } = useData();
const posts = inject("posts", []);

const category = page.value.relativePath
  .replace(/^categories\//, "")
  .replace(/\.md$/, ""); // 从路径推算分类
const filtered = posts.filter((p) => p.category === category);
</script>

<template>
  <div>
    <h1>分类：{{ category }}</h1>
    <ul>
      <li v-for="p in filtered" :key="p.path">
        <a :href="p.path">{{ p.title }}</a>
        <small>({{ p.date?.split('T')[0] }})</small>
      </li>
    </ul>
  </div>
</template>

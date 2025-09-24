<script setup>
import { inject } from "vue";
const posts = inject("posts", []);
</script>

<template>
  <div>
    <h1>博客首页</h1>
    <ul>
      <li v-for="p in posts" :key="p.path">
        <a :href="p.path">{{ p.title }}</a>
        <small>({{ p.date?.split('T')[0] }})</small>
      </li>
    </ul>
  </div>
</template>

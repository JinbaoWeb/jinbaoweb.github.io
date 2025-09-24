import DefaultTheme from "vitepress/theme";
import posts from "../posts.data.json";

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.provide("posts", posts);
  },
};

import { defineConfig } from "vitepress";
import { usePosts } from "../src/composables/usePosts";
import { hashPassword } from "../src/utils/hashPassword";
import type { ThemeConfig } from "../src/types";

const { posts, hiddenPosts, excludePosts, descriptionMap, rewrites } =
  await usePosts({
    pageSize: 6,
    homepage: false,
    srcDir: "posts",
    excerpt: 150,
  });
export default defineConfig<ThemeConfig>({
  title: "My Blog",
  titleTemplate: "My Blog",
  description: "My personal blog",
  rewrites,
  cleanUrls: true,
  ignoreDeadLinks: true,
  lastUpdated: true,
  sitemap: {
    hostname: "https://yourdomain.com",
    transformItems: (items) => {
      return items.filter(
        (item) => !hiddenPosts.has(item.url.replace(/\.html$/, "")),
      );
    },
  },
  transformPageData(pageData) {
    const { frontmatter, description } = pageData;
    const { id, password } = frontmatter;
    if (password) {
      frontmatter.password = hashPassword(String(password));
    }
    if (!description) {
      pageData.description = descriptionMap.get(id) as string;
    }
  },
  themeConfig: {
    posts,
    page: {
      max: 5,
    },
    classicCategory: false,
    transition: true,
    logo: "/profilePic.jpg",
    outline: { level: 2 },
    nav: [
      { text: "Home", link: "/" },
      { text: "Posts", link: "/page-1" },
      { text: "Category", link: "/category" },
      { text: "Archives", link: "/archives" },
      { text: "About Me", link: "/about" },
    ],
    socialLinks: [{ icon: "github", link: "https://github.com/otouat" }],
    footer: {
      message:
        'Theme by <a href="https://github.com/izhichao/vitepress-theme-minimalism" target="_blank">Minimalism</a>',
      copyright: `Copyright © 2024-${new Date().getFullYear()} <a href="https://github.com/otouat" target="_blank">Ousmane Touat</a>`,
    },
    search: { provider: "local" },
  },
  markdown: {
    lineNumbers: true,
    config: (md) => {
      md.use((md) => {
        md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
          let htmlResult = slf.renderToken(tokens, idx, options);
          if (tokens[idx].tag === "h1") htmlResult += `<PostMeta />`;
          return htmlResult;
        };
      });
    },
  },
  srcExclude: ["README.md", "README_en-US.md"],
});

---
title: Categories
layout: page
---

<Category>
</Category>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useData } from "vitepress"
import AdItem from '/src/components/AdItem.vue';
import { ads } from '/.vitepress/theme/ads.ts';

const { params, site } = useData();

onMounted(() => {
  if (params.value?.category && params.value.category !== 'index') {
      document.title = `Category: ${params.value.category} | ${site.value.titleTemplate}`;
  }
});
</script>

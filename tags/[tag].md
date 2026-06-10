---
title: Tags
layout: page
---

<Category type="tag">

</Category>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useData } from "vitepress"
import AdItem from '/src/components/AdItem.vue';
import { ads } from '/.vitepress/theme/ads.ts';

const { params, site } = useData();

onMounted(() => {
  if (params.value?.tag && params.value.tag !== 'index') {
    document.title = `标签：${params.value.tag} | ${site.value.titleTemplate}`;
  }
});
</script>

<template>
    <div class="ZCContainer">
        <div class="ZCLayout">
            <div class="ZCContent">
                <slot name="doc-before"></slot>

                <div class="title">Categories</div>
                <TabList
                    @change="(tab) => handleChange(tab, 'category')"
                    type="category"
                    :tabs="tabs.category"
                    :selected="currentType === 'category' ? select : null"
                    :posts="posts.category"
                />

                <div class="title">Tags</div>
                <TabList
                    @change="(tab) => handleChange(tab, 'tag')"
                    type="tag"
                    :tabs="tabs.tag"
                    :selected="currentType === 'tag' ? select : null"
                    :posts="posts.tag"
                />

                <div v-show="select" class="title">
                    {{ currentType === "category" ? "Category:" : "Tag:"
                    }}{{ select }}
                </div>

                <PostList
                    :posts="posts[currentType][select]"
                    :showPinned="false"
                />

                <slot name="doc-after"></slot>
            </div>
            <aside class="ZCAside ZCAside--left">
                <slot name="aside-left"></slot>
            </aside>
            <aside class="ZCAside ZCAside--right">
                <slot name="aside-right"></slot>
            </aside>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useData, useRouter } from "vitepress";
import TabList from "../components/TabList.vue";
import PostList from "../components/PostList.vue";
import { useGroup } from "../composables/useGroup";

const { theme } = useData();
const { tabs, posts } = useGroup(theme.value?.posts || []);
const router = useRouter();

// Initialize state
const select = ref("");
const currentType = ref<"category" | "tag">("category");
let baseUrl = "/";

// Update state based on URL parameters
const updateQuery = () => {
    if (typeof window === "undefined") return;

    const search = location.href.split("?")[1];
    const params = new URLSearchParams(search);

    // Determine type and selected value
    const categoryParam = params.get("category");
    const tagParam = params.get("tag");
    select.value = categoryParam || tagParam || "";
    currentType.value = categoryParam ? "category" : "tag";
};

const themeAfter = router.onAfterRouteChange;
router.onAfterRouteChange = (to) => {
    themeAfter?.(to);
    updateQuery();
};

onMounted(() => {
    baseUrl = location.href.split("?")[0];
    updateQuery();
});

const handleChange = (tab: string, type: "category" | "tag") => {
    select.value = tab;
    currentType.value = type;
    if (typeof window !== "undefined") {
        const newUrl = `${baseUrl}?${type}=${tab.replaceAll("&", "%26")}`;
        window.history.replaceState(null, "", newUrl);
    }
};
</script>

<style lang="less" scoped>
@import "../styles/page.less";
.title {
    font-size: 1.25rem;
    padding: 2rem 0 1rem;
    font-family: var(--font-family-number);
    font-weight: 700;

    &:first-of-type {
        padding-top: 0;
    }
}
</style>

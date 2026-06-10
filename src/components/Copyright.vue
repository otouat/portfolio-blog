<template>
    <div class="copyright-info">
        <div class="copyright-info__item">
            <Icon class="copyright-info__icon" icon="mingcute:user-3-line" />
            <span class="copyright-info__label">Author</span>
            <span class="copyright-info__value">
                <a :href="host" class="copyright-info__link">{{ author }}</a>
            </span>
        </div>
        <div class="copyright-info__item">
            <Icon class="copyright-info__icon" icon="mingcute:document-line" />
            <span class="copyright-info__label">Title</span>
            <span class="copyright-info__value">{{ articleTitle }}</span>
        </div>
        <div class="copyright-info__item">
            <Icon class="copyright-info__icon" icon="mingcute:link-line" />
            <span class="copyright-info__label">Link</span>
            <span class="copyright-info__value">
                <a
                    :href="url"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="copyright-info__link"
                    >{{ url }}</a
                >
            </span>
        </div>
        <div class="copyright-info__item">
            <Icon class="copyright-info__icon" icon="mingcute:copyright-line" />
            <span class="copyright-info__label">Copyright</span>
            <span class="copyright-info__value">
                Unless otherwise stated, all articles on this blog are licensed
                under
                <a
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="copyright-info__link"
                >
                    CC BY-NC-SA 4.0
                </a>
                . Please indicate the source when re-posting!
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useData, useRoute } from "vitepress";
import { computed, ref, onMounted, watch, nextTick } from "vue";
import { Icon } from "@iconify/vue";

const { site, page } = useData();
const route = useRoute();

// Get site title from config.ts as author
const author = computed(() => site.value.title);
const articleTitle = computed(() => page.value.title);

const url = ref("");
const host = ref("");

// Extract common URL update function
const updateUrl = () => {
    if (typeof window !== "undefined") {
        const urlObj = new URL(window.location.href);
        url.value = urlObj.origin + urlObj.pathname;
        host.value = urlObj.origin + site.value.base;
    }
};

// 1. Execute on initial client mount
onMounted(updateUrl);

// 2. Execute on route change
watch(
    () => route.path,
    () => nextTick(updateUrl),
);
</script>

<style lang="less" scoped>
.copyright-info {
    padding: 16px 20px;
    border: 1px solid var(--vp-c-divider);
    background-color: var(--vp-c-bg-soft);
    border-radius: 1rem;
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    gap: 12px;

    // Info items
    &__item {
        display: flex;
        align-items: flex-start;
        gap: 8px;
        font-size: 14px;
        color: var(--vp-c-text-2);
        line-height: 1.6;
    }

    // Icon
    &__icon {
        width: 16px;
        height: 16px;
        color: var(--vp-c-text-3);
        flex-shrink: 0;
        margin-top: 3px;
    }

    // Label text
    &__label {
        color: var(--vp-c-text-3);
        font-weight: 400;
        flex-shrink: 0;
        width: 60px;
        /* Align labels, set to auto for responsive */
    }

    // Value text
    &__value {
        color: var(--vp-c-text-1);
        font-weight: 500;
        word-break: break-all;
    }

    // Link
    &__link {
        color: var(--vp-c-brand-1);
        text-decoration: none;
        font-weight: 500;
        transition: color 0.25s;

        &:hover {
            color: var(--vp-c-brand-2);
        }
    }
}

// Responsive design
@media (max-width: 768px) {
    .copyright-info {
        &__item {
            font-size: 13px;
        }
    }
}
</style>

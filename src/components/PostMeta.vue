<template>
    <div class="post-info" v-if="datetime">
        <!-- Row 1: Published at, Updated at (Left), Views (Right) -->
        <div class="post-info__row post-info__row--primary">
            <div class="post-info__group post-info__group--left">
                <!-- Published at -->
                <div class="post-info__item">
                    <Icon
                        class="post-info__icon"
                        icon="mingcute:calendar-line"
                    />
                    <span class="post-info__label">Published</span>
                    <span class="post-info__value">{{
                        formatDate(datetime)
                    }}</span>
                </div>

                <!-- Updated at -->
                <div class="post-info__item" v-if="lastUpdated">
                    <Icon class="post-info__icon" icon="mingcute:time-line" />
                    <span class="post-info__label">Updated</span>
                    <span class="post-info__value">{{
                        formatDate(lastUpdated)
                    }}</span>
                </div>
            </div>

            <!-- Views -->
            <div class="post-info__group post-info__group--right" v-if="views">
                <div class="post-info__item">
                    <Icon class="post-info__icon" icon="mingcute:eye-line" />
                    <span class="post-info__label">Views</span>
                    <span class="post-info__value">{{ views }}</span>
                </div>
            </div>
        </div>

        <!-- Row 2: Category, Tags -->
        <div
            class="post-info__row post-info__row--secondary"
            v-if="category || (tags && tags.length > 0)"
        >
            <!-- Category -->
            <div class="post-info__category" v-if="category">
                <Icon class="post-info__icon" icon="mingcute:folder-line" />
                <span class="post-info__label">Category</span>
                <a
                    :href="withBase(categoryLink(category))"
                    class="post-info__badge post-info__badge--category"
                >
                    {{ category }}
                </a>
            </div>

            <!-- Tags -->
            <div class="post-info__tags" v-if="tags && tags.length > 0">
                <Icon class="post-info__icon" icon="mingcute:tag-line" />
                <span class="post-info__label">Tags</span>
                <div class="post-info__tags-list">
                    <a
                        v-for="tag in tags"
                        :key="tag"
                        :href="withBase(tagLink(tag))"
                        class="post-info__badge post-info__badge--tag"
                    >
                        {{ tag }}
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useData, withBase } from "vitepress";
import { useLink } from "../composables/useLink";
import { Icon } from "@iconify/vue";

const { page, frontmatter } = useData();
const { categoryLink, tagLink } = useLink();

const { lastUpdated } = page.value;
const { datetime, views, category, tags } = frontmatter.value;

const formatDate = (datetime: string | number) => {
    if (!datetime) return "";
    const date = new Date(datetime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
};
</script>

<style lang="less" scoped>
.post-info {
    padding: 16px 20px;
    border: 1px solid var(--vp-c-divider);
    background-color: var(--vp-c-bg-soft);
    border-radius: 1rem;
    margin: 20px 0;

    // Row container
    &__row {
        display: flex;
        align-items: center;

        // Row 1
        &--primary {
            justify-content: space-between;
        }

        // Row 2
        &--secondary {
            gap: 20px;
            margin-top: 12px;
            flex-wrap: wrap;
        }
    }

    // Group container
    &__group {
        display: flex;
        align-items: center;

        &--left {
            gap: 20px;
            flex-wrap: wrap;
        }

        &--right {
            // Views aligned right
        }
    }

    // Info item
    &__item {
        display: flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        color: var(--vp-c-text-2);
    }

    // Icon
    &__icon {
        width: 16px;
        height: 16px;
        color: var(--vp-c-text-3);
        flex-shrink: 0;
    }

    // Label text
    &__label {
        color: var(--vp-c-text-3);
        font-weight: 400;
        font-size: 14px;
        flex-shrink: 0;
    }

    // Value text
    &__value {
        color: var(--vp-c-text-1);
        font-weight: 500;
    }

    // Category container
    &__category {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
    }

    // Tags container
    &__tags {
        display: flex;
        align-items: center;
        gap: 8px;
        flex-wrap: wrap;
    }

    // Tags list
    &__tags-list {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
    }

    // Badge common styles
    &__badge {
        display: inline-block;
        padding: 0.075rem 0.625rem;
        border-radius: 0.5rem;
        font-size: 0.8rem;
        color: var(--vp-c-text-2);
        text-decoration: none;
        transition: all 0.3s ease;
        font-weight: 500;

        // Category badge
        &--category {
            background-color: var(--vp-c-gray-2);

            &:hover {
                background-color: var(--vp-c-brand-soft);
                text-decoration: none;
            }
        }

        // Tag badge
        &--tag {
            border-radius: 9999px;
            background-color: var(--vp-c-bg);
            border: 1px solid var(--vp-c-divider);

            &:hover {
                background-color: var(--vp-c-brand-soft);
                border-color: var(--vp-c-brand);
                text-decoration: none;
            }
        }
    }
}

// Responsive design
@media (max-width: 768px) {
    .post-info {
        &__row {
            &--primary {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
            }

            &--secondary {
                flex-direction: column;
                align-items: flex-start;
                gap: 12px;
            }
        }

        &__group {
            &--left {
                gap: 12px;
            }
        }

        &__item {
            font-size: 13px;
        }

        &__badge {
            font-size: 0.75rem;
        }
    }
}
</style>

<template>
    <div class="about-container">
        <header class="about-hero">
            <div class="about-hero__avatar-wrapper">
                <img
                    :src="profile.avatar"
                    :alt="profile.name"
                    class="about-hero__avatar"
                />
            </div>
            <div class="about-hero__info">
                <h1 class="about-hero__name">{{ profile.name }}</h1>
                <h2 class="about-hero__title">{{ profile.title }}</h2>
                <p class="about-hero__bio">{{ profile.bio }}</p>

                <div class="about-hero__socials">
                    <a
                        v-for="social in socials"
                        :key="social.network"
                        :href="social.url"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="social-link"
                        :aria-label="social.network"
                    >
                        <Icon :icon="social.icon" width="24" height="24" />
                    </a>
                </div>
            </div>
        </header>

        <div class="about-content">
            <div class="about-content__main">
                <section class="cv-section">
                    <h3 class="cv-section__title">
                        <Icon
                            icon="mingcute:briefcase-line"
                            class="cv-section__icon"
                        />
                        Experience
                    </h3>
                    <div class="timeline">
                        <div
                            v-for="(job, index) in experience"
                            :key="index"
                            class="timeline-item"
                        >
                            <div class="timeline-item__header">
                                <h4 class="timeline-item__role">
                                    {{ job.role }}
                                </h4>
                                <span class="timeline-item__date">{{
                                    job.duration
                                }}</span>
                            </div>
                            <div class="timeline-item__company">
                                {{ job.company }}
                            </div>
                            <p class="timeline-item__desc">
                                {{ job.description }}
                            </p>
                        </div>
                    </div>
                </section>

                <section class="cv-section">
                    <h3 class="cv-section__title">
                        <Icon
                            icon="mingcute:book-2-line"
                            class="cv-section__icon"
                        />
                        Education
                    </h3>
                    <div class="timeline">
                        <div
                            v-for="(edu, index) in education"
                            :key="index"
                            class="timeline-item"
                        >
                            <div class="timeline-item__header">
                                <h4 class="timeline-item__role">
                                    {{ edu.degree }}
                                </h4>
                                <span class="timeline-item__date">{{
                                    edu.duration
                                }}</span>
                            </div>
                            <div class="timeline-item__company">
                                {{ edu.institution }}
                            </div>
                        </div>
                    </div>
                </section>

                <section class="cv-section">
                    <h3 class="cv-section__title">
                        <Icon
                            icon="mingcute:microscope-line"
                            class="cv-section__icon"
                        />
                        Selected Publications & Projects
                    </h3>
                    <ul class="publications-list">
                        <li
                            v-for="(pub, index) in publications"
                            :key="index"
                            class="pub-item"
                        >
                            <a
                                v-if="pub.link"
                                :href="pub.link"
                                target="_blank"
                                class="pub-item__title"
                                >{{ pub.title }}</a
                            >
                            <span v-else class="pub-item__title">{{
                                pub.title
                            }}</span>
                            <span v-if="pub.venue" class="pub-item__venue">
                                — {{ pub.venue }}</span
                            >
                        </li>
                    </ul>
                </section>
            </div>

            <aside class="about-content__sidebar">
                <section class="cv-widget">
                    <h4 class="cv-widget__title">Details</h4>
                    <ul class="details-list">
                        <li>
                            <Icon icon="mingcute:location-line" />
                            <span>{{ profile.location }}</span>
                        </li>
                        <li>
                            <Icon icon="mingcute:mail-line" />
                            <a :href="`mailto:${profile.email}`">{{
                                profile.email
                            }}</a>
                        </li>
                    </ul>
                </section>

                <section class="cv-widget">
                    <h4 class="cv-widget__title">Research Interests</h4>
                    <ul class="interests-list">
                        <li v-for="interest in interests" :key="interest">
                            <Icon
                                icon="mingcute:right-line"
                                class="interest-icon"
                            />
                            {{ interest }}
                        </li>
                    </ul>
                </section>

                <section class="cv-widget">
                    <h4 class="cv-widget__title">Technical Skills</h4>
                    <div class="skills-tags">
                        <span
                            v-for="skill in skills"
                            :key="skill"
                            class="skill-tag"
                            >{{ skill }}</span
                        >
                    </div>
                </section>
            </aside>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useData } from "vitepress";
import { computed } from "vue";

// Declare frontmatter before using it
const { frontmatter } = useData();
const profile = computed(() => frontmatter.value.profile || {});
const socials = computed(() => frontmatter.value.socials || []);
const interests = computed(() => frontmatter.value.interests || []);
const skills = computed(() => frontmatter.value.skills || []);
const experience = computed(() => frontmatter.value.experience || []);
const education = computed(() => frontmatter.value.education || []);
const publications = computed(() => frontmatter.value.publications || []);
</script>

<style lang="less" scoped>
.about-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 2rem 0;
}

/* Hero Section */
.about-hero {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding-bottom: 2.5rem;
    margin-bottom: 2.5rem;
    border-bottom: 1px solid var(--vp-c-divider);

    &__avatar-wrapper {
        flex-shrink: 0;
    }

    &__avatar {
        width: 160px;
        height: 160px;
        border-radius: 50%;
        object-fit: cover;
        border: 4px solid var(--vp-c-bg-soft);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }

    &__info {
        flex: 1;
    }

    &__name {
        font-size: 2.5rem;
        font-weight: 700;
        margin: 0 0 0.25rem 0;
        color: var(--vp-c-text-1);
    }

    &__title {
        font-size: 1.25rem;
        font-weight: 500;
        color: var(--vp-c-brand);
        margin: 0 0 1rem 0;
    }

    &__bio {
        font-size: 1rem;
        color: var(--vp-c-text-2);
        line-height: 1.6;
        margin: 0 0 1.5rem 0;
    }

    &__socials {
        display: flex;
        gap: 1rem;

        .social-link {
            display: inline-flex;
            color: var(--vp-c-text-2);
            transition:
                color 0.3s ease,
                transform 0.3s ease;

            &:hover {
                color: var(--vp-c-brand);
                transform: translateY(-2px);
            }
        }
    }
}

/* Main Content Grid */
.about-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 3rem;

    &__main {
        display: flex;
        flex-direction: column;
        gap: 2.5rem;
    }

    &__sidebar {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
}

/* Section Common Styles */
.cv-section {
    &__title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--vp-c-text-1);
        margin: 0 0 1.5rem 0;
        padding-bottom: 0.5rem;
        border-bottom: 2px solid var(--vp-c-bg-soft);
    }

    &__icon {
        color: var(--vp-c-brand);
    }
}

/* Timeline */
.timeline {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    border-left: 2px solid var(--vp-c-divider);
    padding-left: 1.5rem;
    margin-left: 0.5rem;
}

.timeline-item {
    position: relative;

    &::before {
        content: "";
        position: absolute;
        left: -1.95rem;
        top: 0.3rem;
        width: 0.75rem;
        height: 0.75rem;
        border-radius: 50%;
        background-color: var(--vp-c-bg);
        border: 2px solid var(--vp-c-brand);
    }

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        margin-bottom: 0.25rem;
        flex-wrap: wrap;
        gap: 0.5rem;
    }

    &__role {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--vp-c-text-1);
        margin: 0;
    }

    &__date {
        font-size: 0.875rem;
        color: var(--vp-c-text-3);
        font-family: var(--vp-font-family-mono);
    }

    &__company {
        font-weight: 500;
        color: var(--vp-c-text-2);
        margin-bottom: 0.5rem;
    }

    &__desc {
        color: var(--vp-c-text-2);
        font-size: 0.95rem;
        line-height: 1.5;
        margin: 0;
    }
}

/* Publications */
.publications-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .pub-item {
        padding: 1rem;
        background-color: var(--vp-c-bg-soft);
        border-radius: 0.5rem;
        border: 1px solid var(--vp-c-divider);

        &__title {
            font-weight: 600;
            color: var(--vp-c-text-1);
            text-decoration: none;

            a& {
                color: var(--vp-c-brand);
                &:hover {
                    text-decoration: underline;
                }
            }
        }

        &__venue {
            color: var(--vp-c-text-2);
            font-size: 0.9rem;
            font-style: italic;
        }
    }
}

/* Sidebar Widgets */
.cv-widget {
    background-color: var(--vp-c-bg-soft);
    padding: 1.5rem;
    border-radius: 0.75rem;
    border: 1px solid var(--vp-c-divider);

    &__title {
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--vp-c-text-1);
        margin: 0 0 1rem 0;
    }
}

/* Details List */
.details-list,
.interests-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    li {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        color: var(--vp-c-text-2);
        font-size: 0.95rem;

        a {
            color: inherit;
            text-decoration: none;
            &:hover {
                color: var(--vp-c-brand);
            }
        }
    }
}

.interest-icon {
    color: var(--vp-c-brand);
    font-size: 1rem;
}

/* Skills Tags */
.skills-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.skill-tag {
    background-color: var(--vp-c-bg);
    border: 1px solid var(--vp-c-divider);
    color: var(--vp-c-text-2);
    padding: 0.25rem 0.75rem;
    border-radius: 99px;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.2s;

    &:hover {
        border-color: var(--vp-c-brand);
        color: var(--vp-c-brand);
    }
}

/* Responsive */
@media (max-width: 768px) {
    .about-hero {
        flex-direction: column;
        text-align: center;
        gap: 1.5rem;

        &__socials {
            justify-content: center;
        }
    }

    .about-content {
        grid-template-columns: 1fr;
    }

    .timeline-item__header {
        flex-direction: column;
        gap: 0.25rem;
    }
}
</style>

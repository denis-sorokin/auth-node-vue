<template>
    <div class="language-dropdown dropdown navbar-dropdown">
        <a class="language-dropdown-button dropdown-toggle" href="#">
            <span class="flag-icon flag-icon-large" :class="flagIconClass(currentLanguage())"></span>
        </a>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <a class="dropdown-item"
               :class="{ active: option.code === currentLanguage() }"
               v-for="(option, id) in options"
               :key="id"
               @click="setLanguage(option.code)">
                <span class="flag-icon flag-icon-small" :class="flagIconClass(option.code)"></span>
                <span class="dropdown-item__text ellipsis">
          {{ option.name }}
        </span>
            </a>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        name: 'language-dropdown',

        props: {
            options: {
                type: Array,
                default: () => [
                    {
                        code: 'gb',
                        name: 'English'
                    },
                    {
                        code: 'ru',
                        name: 'Русский'
                    }
                ]
            }
        },
        methods: {
            setLanguage (locale) {
                Vue.i18n.set(locale)
            },

            currentLanguage () {
                return Vue.i18n.locale() === 'en' ? 'gb' : Vue.i18n.locale()
            },

            flagIconClass (code) {
                return `flag-icon-${code}`
            }
        }
    }
</script>

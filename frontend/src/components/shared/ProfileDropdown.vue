<template>
    <div class="profile-dropdown dropdown navbar-dropdown">
        <a class="dropdown-toggle" href="#">
              <span class="profile-section-avatar-container">
                  <slot></slot>
              </span>
        </a>
        <div class="dropdown-menu last">
            <div class="dropdown-menu-content">
                <div v-for="(option, id) in options" :key="id"
                     class="dropdown-item">
                    <router-link :to="{name: option.redirectTo}">
                        {{ $t('auth.logout') }}
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'ProfileDropdown',
        props: {
            options: {
                type: Array,
                default: () => [
                    {
                        name: 'logout',
                        redirectTo: 'logout'
                    }
                ]
            }
        }
    }
</script>

<template>
    <div class="login">
        <h2>{{ $t('main.welcome') }}</h2>
        <div class="wp-300">
            <div class="form-group">
                <div class="input-group d-flex flex-column">
                    <label class="control-label" for="email">{{ $t('auth.email') }}</label><i class="bar"></i>
                    <input type="text" id="email" v-model="email" required="required"/>
                </div>
                <div class="input-group d-flex flex-column mt-3">
                    <label class="control-label" for="password">{{ $t('auth.password') }}</label><i class="bar"></i>
                    <input type="password" id="password" v-model="password" required="required"/>
                </div>
            </div>
            <button class="btn btn-primary" @click="auth">{{ $t('auth.login') }}</button>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Login',
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            auth() {
                console.log('auth')
            }
        }
    }
</script>

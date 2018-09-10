<template>
    <div class="register w-100">
        <div class="container">
            <div class="row">
                <div class="col-8 offset-2">
                    <h2 class="font-weight-bold text-company">{{ $t('main.register') }}</h2>
                    <div class="form-group mt-5 wp-max-content mx-auto pr-5">
                        <v-input :data="{
                        name: 'username', label: $t('auth.login'), valid: validateUsername,
                        type: 'text', required: true }" @change="updateUsername"/>
                        <v-input :data="{
                        name: 'email', label: $t('auth.email'), valid: validateEmail,
                        type: 'text', required: true }" @change="updateEmail"/>
                        <v-input :data="{
                        name: 'password', label: $t('auth.password'), valid: validatePassword,
                        type: 'password', validFeedback: 'Only _.-+', required: true }" @change="updatePassword"/>
                    </div>
                    <button class="btn btn-primary btn-lg mt-5" :disabled="!validateInputs" @click="signUp">{{ $t('auth.signUp') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import auth from '../components/mixins/auth'

    export default {
        name: 'Register',
        mixins: [ auth ],
        data () {
            return {
                email: null,
                password: null,
                username: null
            }
        },
        methods: {
            signUp() {
                console.log('signUp');
            }
        }
    }
</script>

<template>
    <div class="register my-auto align-self-center">
        <div class="container">
            <div class="row">
                <div class="col-8 offset-2">
                    <h2>{{ $t('main.register') }}</h2>
                    <div class="form-group">
                        <div class="input-group d-flex flex-column">
                            <label class="control-label" for="username">{{ $t('auth.login') }}</label><i class="bar"></i>
                            <input type="text" id="username" v-model="username" required="required" class="border-25"/>
                        </div>
                        <div class="input-group d-flex flex-column">
                            <label class="control-label" for="email">{{ $t('auth.email') }}</label><i class="bar"></i>
                            <input type="text" id="email" v-model="email" required="required" class="border-25"/>
                        </div>
                        <div class="input-group d-flex flex-column mt-3">
                            <label class="control-label" for="password">{{ $t('auth.password') }}</label><i class="bar"></i>
                            <input type="password" id="password" v-model="password" required="required" class="border-25"/>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-lg" @click="signUp">{{ $t('auth.signUp') }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'Register',
        data () {
            return {
                email: null,
                password: null,
                username: null
            }
        },
        computed: {
            validateInputs() {
                const email = /^((\w+(\.|\-|\+)?)(\w+))(\@)(\w+)(\.\w{3})$/.test(this.email);
                const password = /^(\w+(\.|\#|\*|\$|\!|)*)+$/.test(this.password);
                const username = /^(\w)+$/.test(this.username);
                return (email && password && username)
            }
        },
        methods: {
            signUp() {
                console.log('signUp');
            }
        }
    }
</script>

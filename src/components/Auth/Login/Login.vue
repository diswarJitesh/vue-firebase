
<template src='./Login.html'>
</template>

<script lang="ts" >

    import { Component, Vue, Mixins } from 'vue-property-decorator';
    import { required, email } from "vuelidate/lib/validators";
    import {Validations} from 'vuelidate-property-decorators';


    @Component
    export default class Login extends Vue {
        loginForm = {
            email: '',
            password: ''
        } 
        validationObj: any
        submitted = false
        
        @Validations()
        validations = {
            loginForm: {
                email: { required, email },
                password: { required },
            }
        }

        login($v): void {
            this.submitted = true
            this.validationObj = $v
            if (!this.validationObj.$invalid) {
                 this.$store.dispatch('login', {
                    email: this.loginForm.email,
                    password: this.loginForm.password
                })
            }
        }   
    }
</script>
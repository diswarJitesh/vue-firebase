
<template src='./SignUp.html'>
</template>

<script lang="ts" >

    import { Component, Vue } from 'vue-property-decorator';
    import { required, email, sameAs, minLength } from "vuelidate/lib/validators";
    import { Validations } from 'vuelidate-property-decorators';

    @Component
    export default class SignUp extends Vue {
        validationObj: any
        submitted = false
        signupForm = {
            name: '',
            title: '',
            email: '',
            password: '',
            cpassword: ''
        }

        @Validations()
        validations = {
            signupForm: {
                name: { required },
                title: { required },
                email: { required, email },
                password: { required, minLength: minLength(6) },
                cpassword: { required, sameAsPassword: sameAs('password') }
            }
        }

        signup($v): void {
            this.submitted = true
            this.validationObj = $v
            if (!this.validationObj.$invalid) {
                this.$store.dispatch('signup', {
                    email: this.signupForm.email,
                    password: this.signupForm.password,
                    name: this.signupForm.name,
                    title: this.signupForm.title
                })
            }    
        }   
    }
</script>
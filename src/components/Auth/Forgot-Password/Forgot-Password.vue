
<template src='./Forgot-Password.html'>
</template>

<script lang="ts" >

    import { Component, Vue } from 'vue-property-decorator';
    import { auth } from '../../../firebase'
    import { required, email } from "vuelidate/lib/validators";
    import { Validations } from 'vuelidate-property-decorators';
    import SharedMixin from '@/shared/mixins'

    @Component
    export default class ForgotPassword extends Vue {
        forgotPasswordForm = {
            email: ''
        }
        validationObj: any
        submitted = false

        @Validations()
        validations = {
            forgotPasswordForm: {
                email: { required, email }
            }
        }

        async resetPassword($v) {
            this.submitted = true
            this.validationObj = $v
            if (!this.validationObj.$invalid) {
                this.$store.commit('setLoaderState', true)
                try {
                    await auth.sendPasswordResetEmail(this.forgotPasswordForm.email)
                    this.$store.commit('setLoaderState', false)
                    this.$router.push('login');
                } catch (error) {
                    this.$store.commit('setLoaderState', false)
                    SharedMixin.showToastMessage(this.$toasted, 'error', error.message)
                }
            }     
        }    
    }
</script>
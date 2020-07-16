
<template src='./Header.html'>
</template>

<script lang="ts" >

    import { Component, Vue } from 'vue-property-decorator'
    import { auth } from '@/firebase'

    @Component
    export default class Headers extends Vue {
        
        get userProfile() {
            return this.$store.state.userProfile
        }
        
        logout(): void {
            this.$store.dispatch('logout')
        }
    }   
</script>

<style lang="scss" src="./Header.scss">
</style>


<template src='./Loader.html'>
</template>

<script lang="ts" >

    import { Component, Vue } from 'vue-property-decorator'
    
    @Component
    export default class Loader extends Vue {
        text = 'Loading'
    }   
</script>

<style lang="scss" src="./Loader.scss">
</style>


<template src='./FullPostModal.html'>
</template>

<script lang="ts" >

    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { auth } from '../../../firebase'

    @Component
    export default class FullPostModal extends Vue {
        @Prop()
        post: any;
        
        fullPost = {}
        auth = auth;

        get postComments() {
            return this.$store.state.postComments
        }
        mounted() {
            this.fullPost = this.post
            this.$store.dispatch('postComments', this.post.id)
        }

    }   
</script>

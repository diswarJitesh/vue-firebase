
<template src='./CommentModal.html'>
</template>

<script lang="ts" >

    import { Component, Vue, Prop } from 'vue-property-decorator'
    import { commentsCollection, postsCollection, auth } from '@/firebase'


    @Component
    export default class CommentModal extends Vue {
        @Prop()
        post: any;
        comment = ''

        async addComment() {
            const authObj: any = auth;
            // create comment
            this.$store.dispatch('addComment', [this.comment, this.post])
            // close modal
            this.$emit('close')
        }
    }   
</script>


<template src='./Dashboard.html'>
</template>

<script lang="ts" >

    import { Component, Vue, Prop } from 'vue-property-decorator';
    import Headers from '@/components/Shared/Header/Header.vue';
    import CommentModal from '@/components/Shared/CommentModal/CommentModal.vue'
    import FullPostModal from '@/components/Shared/FullPostModal/FullPostModal.vue'
    import { auth } from '../../firebase'

    @Component({
        components: {
            Headers,
            CommentModal,
            FullPostModal
        }
    })

    export default class Dashboard extends Vue {
        post = {
            content: ''
        }
        auth = auth;
        showCommentModal = false
        selectedPost = {}
        showPostModal = false

        get userProfile() {
            return this.$store.state.userProfile
        }

        get posts() {
            return this.$store.state.posts
        }

        mounted() {
            this.$store.dispatch('getPosts')
        }

        createPost(): void {
            this.$store.dispatch('createPost', { content: this.post.content })
            this.post.content = ''
        }

        toggleCommentModal(post: any) {
            this.showCommentModal = !this.showCommentModal
            // if opening modal set selectedPost, else clear
            this.selectedPost = this.showCommentModal ? post : {};
        }

        likePost(id: any, likesCount: any) {
            this.$store.dispatch('likePost', { id, likesCount })
        }

        toggleFullPostModal(post: any) {
            this.showPostModal = !this.showPostModal
            // if opening modal set selectedPost, else clear
            this.selectedPost = this.showPostModal ? post : {};
        }
    }
</script>
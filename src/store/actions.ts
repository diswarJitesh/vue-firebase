import * as fb from '../firebase'
import SharedMixin from '@/shared/mixins'
import router from '../router/index'
import store from '../store'

const actions = {
    async login({ dispatch, commit }, form) {
        // sign user in
        commit('setLoaderState', true)
        try {
            const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
            // fetch user profile and set in state
            dispatch('fetchUserProfile', [user, true])
            commit('setLoaderState', false)
        } catch (error) {
            SharedMixin.handleErrorResponse(commit, error)
        }
    },
    async fetchUserProfile({ commit }, [user, naviagate = true]) {
        commit('setLoaderState', true)
        try {
            // fetch user profile
            const userProfile = await fb.usersCollection.doc(user.uid).get()
            // set user profile in state
            commit('setUserProfile', userProfile.data())
            // change route to dashboard
            commit('setLoaderState', false)
            if (naviagate) {
                router.push('/')
            }
        } catch (error) {
            SharedMixin.handleErrorResponse(commit, error)
        }
    },
    async signup({ dispatch, commit }, form) {
        commit('setLoaderState', true)
        try {
            // sign user up
            const { user }: any = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

            // create user profile object in userCollections
            await fb.usersCollection.doc(user.uid).set({
                name: form.name,
                title: form.title
            })
            // fetch user profile and set in state
            dispatch('fetchUserProfile', [user, true])
            commit('setLoaderState', false)
        } catch (error) {
            SharedMixin.handleErrorResponse(commit, error)
        }
    },
    async logout({ commit }) {
        commit('setLoaderState', true)
        await fb.auth.signOut()

        // clear userProfile and redirect to /login
        commit('setUserProfile', {})
        commit('setLoaderState', false)
        router.push('/login')
    },
    async createPost({ state, commit }, post) {
        commit('setLoaderState', true)
        try {
            const firebase: any = fb;
            await firebase.postsCollection.add({
                createdOn: new Date(),
                content: post.content,
                userId: firebase.auth.currentUser.uid,
                userName: state.userProfile.name,
                comments: 0,
                likes: 0
            })
            commit('setLoaderState', false)
        } catch (error) {
            SharedMixin.handleErrorResponse(commit, error)
        }
    },
    async getPosts({ commit }) {
        commit('setLoaderState', true)
        try {
            fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(res => {
                const postsArray: any = []
                res.forEach(doc => {
                    const post = doc.data()
                    post.id = doc.id
                    postsArray.push(post)
                })

                store.commit('setPosts', postsArray)
                commit('setLoaderState', false)
            });
        } catch (error) {
            SharedMixin.handleErrorResponse(commit, error)
        }
    },
    async likePost({ commit }, post) {
        try {
            const firebase: any = fb;
            const userId = firebase.auth.currentUser.uid
            const docId = `${userId}_${post.id}`

            // check if user has liked post
            const doc = await firebase.likesCollection.doc(docId).get()
            if (doc.exists) {
                await firebase.likesCollection.doc(docId).delete()
            } else {
                // post liked
                await firebase.likesCollection.doc(docId).set({
                    postId: post.id,
                    userId: userId
                })
            }

            firebase.postsCollection.doc(post.id).update({
                likes: doc.exists ? post.likesCount - 1 : post.likesCount + 1
            })
            const msg = doc.exists ? 'You unliked this post.' : 'You liked this post.'
            SharedMixin.showToastMessage(store.toasted, 'success', msg)
        } catch (error) {
            SharedMixin.handleErrorResponse(commit, error)
        }
    },
    async addComment({ state, commit }, [comment, post]) {
        try {
            const firebase: any = fb;
            await firebase.commentsCollection.add({
                createdOn: new Date(),
                content: comment,
                postId: post.id,
                userId: firebase.auth.currentUser.uid,
                userName: state.userProfile.name
            })

            // update comment count on post
            await firebase.postsCollection.doc(post.id).update({
                comments: parseInt(post.comments) + 1
            })
            SharedMixin.showToastMessage(store.toasted, 'success', 'Comment added successfully.')
        } catch (error) {
            SharedMixin.handleErrorResponse(commit, error)
        }
    },
    async postComments({ commit }, postId) {
        commit('setLoaderState', true)
        try {
            const firebase: any = fb;
            const postComments: any = []
            const docs = await firebase.commentsCollection.where('postId', '==', postId).get()
            docs.forEach((doc: any) => {
                const comment = doc.data()
                comment.id = doc.id
                postComments.push(comment)
            })
            commit('setPostComments', postComments)
            commit('setLoaderState', false)
        } catch (error) {
            SharedMixin.handleErrorResponse(commit, error)
        }
    }
}

export default actions
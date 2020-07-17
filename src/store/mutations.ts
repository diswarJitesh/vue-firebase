const mutations = {
    setUserProfile(state, val) {
        state.userProfile = val
    },
    setPosts(state, val) {
        state.posts = val
    },
    setPostComments(state, val) {
        state.postComments = val
    },
    setLoaderState(state, show) {
        state.loaderShow = show
    }
}

export default mutations
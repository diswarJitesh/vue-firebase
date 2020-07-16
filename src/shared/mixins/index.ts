export default class SharedMixin {
    public static toastProps = {
        duration: 5000,
        position: 'top-right'
    }
    
    public static showToastMessage (toastObj: any, type = 'success', msg: string) {
        toastObj.clear()
        setTimeout(() => {
            toastObj[type](msg, {
                position: this.toastProps.position,
                duration : this.toastProps.duration,
                icon: type === 'success' ? 'check_circle_outline' : 'error_outline',
                keepOnHover: true,
                action : {
                    text : 'X',
                    class: 'toast-action',
                    onClick : (e, toastObject) => {
                        toastObject.goAway(0);
                    }
                },
            })
        }, 500);
    }

    public static handleErrorResponse (commit, toasted, error) {
        commit('setLoaderState', false)
        if (toasted) {
            SharedMixin.showToastMessage(toasted, 'error', error.message)
        }
    }
}

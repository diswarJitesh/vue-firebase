import Vue from 'vue'
import moment from 'moment'

Vue.filter('titleCase', (value: any) => {
    return value ? value.charAt(0).toUpperCase()+value.slice(1) : ''
});

Vue.filter('formatDate', (value: any) => {
    if (!value) { return '-' }
    
    const date = value.toDate()
    return moment(date).fromNow()
});

Vue.filter('trimLength', (value: any) => {
    if (value.length < 200) { return value }
    return `${value.substring(0, 200)}...`
});

import Vue from 'vue'
import InfiniteLoading from 'vue-infinite-loading'

Vue.component('InfiniteLoading', InfiniteLoading)
Vue.use(InfiniteLoading, {
	slots: {
		noMore: 'No more results',
		noResults: 'No results found',
	},
})
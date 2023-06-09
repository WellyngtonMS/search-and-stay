export default async function ({ store, app }) {
    const token = localStorage.getItem('token')
    if (token) {
        store.commit('isLoggedIn')
        app.$axios.setToken(token, 'Bearer')
    }

	if (!store.state.auth.loggedIn) {
		return false
	}
}

export default function ({ store, redirect, route}) {
    const isNotAuthenticatedUserRoute = [
        '/',
    ].includes(route.path);

    try {
        if (isNotAuthenticatedUserRoute && store.state.auth.loggedIn) {
            return redirect('/home');
        }
        if (!isNotAuthenticatedUserRoute && !store.state.auth.loggedIn) {
            return redirect('/');
        }
    } catch (e) {
        console.error('Error in authenticated.js middleware:')
        if(this.$route.path !== "/home"){
            return redirect('/home');
        }
    }
}
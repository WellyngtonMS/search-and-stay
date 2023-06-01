<template>
    <div v-if="shouldShowLogin">
        <Login />
    </div>
    <div v-else>
        <Home />
    </div>
</template>
<script>
import Login from '@/components/Login.vue'
import Home from '@/pages/home/index.vue'
export default {
    components: {
        Login,
        Home,
    },
    computed: {
        shouldShowLogin() {
            return !this.$store.state.auth.loggedIn
        },
    },
}
</script>
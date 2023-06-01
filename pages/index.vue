<template>
    <div v-if="shouldShowLogin">
        <Login />
    </div>
</template>
<script>
import Login from '@/components/Login.vue'
export default {
    components: {
        Login,
    },
    computed: {
        shouldShowLogin() {
            return !this.$store.state.auth.loggedIn
        },
    },
}
</script>
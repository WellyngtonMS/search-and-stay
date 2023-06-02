<template>
    <v-app>
        <Snackbar />
        <SideMenu :drawer="drawer" @update:drawer="drawer = $event" v-if="isAuthenticated" />
        <v-app-bar app color="primary" v-if="isAuthenticated">
            <v-app-bar-nav-icon @click="drawer = !drawer" v-if="isMobile" />
            <v-toolbar-title>My App</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items color="white" v-if="!isMobile">
                <v-btn
                    @click="$router.push({ name: 'home'})"
                    text
                >List Items</v-btn>
                <v-btn
                    @click="$router.push({ name: 'home', query: { create: true } })"
                    text
                >Create Item</v-btn>
                <v-btn
                    @click="logout"
                    text
                >Logout</v-btn>
            </v-toolbar-items>
        </v-app-bar>
        
        <v-main>
            <v-container fluid>
                <nuxt />
            </v-container>
        </v-main>
    </v-app>
</template>

<script>
import SideMenu from '@/components/SideMenu.vue'
import Snackbar from '@/components/Snackbar.vue'
export default {
    components: {
        SideMenu,
        Snackbar,
    },
    data() {
        return {
            drawer: false,
        }
    },
    computed: {
        isAuthenticated() {
            return this.$store.state.auth.loggedIn
        },
        isMobile() {
            return this.$vuetify.breakpoint.xsOnly
        },
    },
    methods: {
        logout() {
            console.log('logout')
        },
    },
}
</script>
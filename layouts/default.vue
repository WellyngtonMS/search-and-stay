<template>
    <v-app>
        <Snackbar />
        <SideMenu :drawer="drawer" @update:drawer="drawer = $event" v-if="isAuthenticated" />
        <v-app-bar app color="primary" v-if="isAuthenticated">
            <v-app-bar-nav-icon @click="drawer = !drawer" v-if="isMobile" />
            <v-toolbar-title>Meu App</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items color="white" v-if="!isMobile">
                <v-btn text>List Items</v-btn>
                <v-btn text>Logout</v-btn>
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
}
</script>
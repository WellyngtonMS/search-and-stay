<template>
    <v-navigation-drawer
        v-model="drawerState"
        temporary
        app
    >
        <v-list>
            <v-list-item v-for="item in menuItems" :key="item.title" :to="item.to" link>
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
        </v-list>
        <template v-slot:append>
            <div class="pa-2">
                <v-btn block color="error" @click="logout">
                    Logout
                </v-btn>
            </div>
        </template>
    </v-navigation-drawer>
</template>

<script>
export default {
    props: {
        drawer: {
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            menuItems: [
                { title: 'List Items', icon: 'mdi-view-list', to: { name: 'home' } },
                { title: 'Create Item', icon: 'mdi-plus', to: { name: 'home', query: { create: true } } },
            ],
            drawerState: this.drawer,
        }
    },
    watch: {
        drawer (val) {
            this.drawerState = val
        },
        drawerState (val) {
            this.$emit('update:drawer', val)
        },
    },
    methods: {
        logout() {
            this.$store.commit('logout')
            this.$router.push({ path: '/' })
        },
    },
}
</script>
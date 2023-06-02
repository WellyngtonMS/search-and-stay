<template>
    <v-container fluid>
        <v-row class="fill-height">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card>
                    <v-card-title class="text-center">
                        <h2>Login</h2>
                    </v-card-title>
                    <v-card-text>
                        <v-text-field v-model="token" label="Token" type="password"
                            :rules="[v => !!v || 'Token is required']"></v-text-field>
                        <v-btn type="submit" color="primary" @click="login" block>Login</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    data() {
        return {
            token: '',
        }
    },
    methods: {
        async login() {
            try {
                const response = await this.$axios.get('/', {
                    headers: {
                        Authorization: `Bearer ${this.token}`,
                    },
                })
                
                if (response.data.success) {
                    this.$notifier.showMessage({ content: 'Logged in successfully', color: 'success' })
                    this.$store.commit('isLoggedIn')
                    localStorage.setItem('token', this.token)
                    this.$axios.setToken(this.token, 'Bearer')
                    this.$router.push({ name: 'home' })
                }          
            } catch (error) {
                this.$notifier.showMessage({ content: 'Invalid token', color: 'error' })
            }
        },
    },
}
</script>
<style>
.fill-height {
    min-height: 100vh;
    justify-content: center;
    align-items: center;
}
</style>
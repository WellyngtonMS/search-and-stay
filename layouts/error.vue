<template>
    <v-app dark>
        <v-container fluid>
            <v-layout align-center justify-center>
                <v-flex xs12>
                    <v-card class="error-card" outlined>
                        <v-card-title class="error-title">
                            {{ pageTitle }}
                        </v-card-title>
                        <v-card-text>
                            <v-row>
                                <v-col cols="12">
                                    <v-icon size="64" color="red">mdi-alert-circle-outline</v-icon>
                                </v-col>
                                <v-col cols="12">
                                    <p v-if="error.statusCode === 404">
                                        {{ pageNotFound }}
                                    </p>
                                    <p v-else>
                                        {{ otherError }}
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card-text>
                        <v-card-actions>
                            <NuxtLink to="/" class="error-link">
                                Home page
                            </NuxtLink>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-app>
</template>

<script>
export default {
    props: {
        error: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            pageNotFound: '404 Not Found',
            otherError: 'An error occurred'
        }
    },
    computed: {
        pageTitle() {
            return this.error.statusCode === 404 ? this.pageNotFound : this.otherError
        }
    },
    head() {
        const title = this.pageTitle
        return {
            title
        }
    }
}
</script>

<style scoped>
.error-card {
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
}

.error-title {
    font-size: 24px;
}

.error-link {
    text-decoration: none;
    color: inherit;
    font-weight: bold;
}
</style>

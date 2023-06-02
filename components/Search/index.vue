<template>
    <v-container>
        <v-text-field v-model="searchId" label="Search by ID" outlined dense @keyup.enter="searchItem">
            <template v-slot:append-outer>
                <v-btn icon color="primary" @click="searchItem">
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>
            </template>
            <template v-slot:append>
                <v-btn v-if="searchId" icon @click="clearSearch">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </template>
        </v-text-field>
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            searchId: "",
            item: null,
        }
    },
    methods: {
        ...mapActions(['getHouseRulesById']),
        async searchItem() {
            if (!this.searchId) {
                this.$notifier.showMessage({
                    content: "Please enter an ID",
                    color: "error",
                })
                return
            }
            try {
                const response = await this.getHouseRulesById({ houseRulesId: this.searchId })
                this.item = response.data
                this.$emit("itemSearch", this.item)
            } catch (error) {
                this.$notifier.showMessage({
                    content: "No items found",
                    color: "error",
                })
            }
        },
        clearSearch() {
            this.searchId = ""
            this.item = null
            this.$emit("reloadItems")
        }
    }
};
</script>
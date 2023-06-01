<template>
    <v-container fluid>
        <v-row>
            <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4" lg="4">
                <Cards :item="item" />
            </v-col>
        </v-row>
        <infinite-loading spinner="spiral" @infinite="infiniteHandler" />
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
import Cards from "@/components/Cards/index.vue";
export default {
    components: {
        Cards,
    },
    data() {
        return {
            page: 1,
            items: []
        };
    },
    methods: {
        ...mapActions(['getHouseRules']),
        async infiniteHandler($state) {
            const response = await this.getHouseRules({ pageNumber: this.page })
            if (response.data.entities.length == 0) {
                $state.complete()
            } else {
                this.page++
                this.items.push(...response.data.entities)
                $state.loaded()
            }
        },
    }
};
</script>
<template>
    <v-container fluid>
        <v-row>            
            <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4" lg="4">
                <ListItem :item="item" @update="reload" />
            </v-col>
        </v-row>
        <infinite-loading spinner="spiral" @infinite="infiniteHandler" />
        <CreateItem v-if="$route.query.create" @update="reload" />
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
import ListItem from "@/components/ListItem/index.vue";
import CreateItem from "@/components/CreateItem/index";
export default {
    components: {
        ListItem,
        CreateItem,
    },
    data() {
        return {
            page: 1,
            items: [],
        }
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
        reload() {
            setTimeout(() => {
                window.location.reload()
            }, 500)
        }
    }
};
</script>
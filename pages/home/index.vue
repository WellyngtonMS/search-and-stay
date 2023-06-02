<template>
    <v-container fluid>
        <Search @itemSearch="itemSearch" @reloadItems="reload" />
        <v-row>            
            <v-col v-for="(item, index) in items" :key="index" cols="12" sm="6" md="4" lg="4">
                <ListItem :item="item" @update="reload" />
            </v-col>
        </v-row>
        <infinite-loading spinner="spiral" :identifier="infiniteId" @infinite="infiniteHandler" />
        <CreateItem v-if="$route.query.create" @update="reload" />
    </v-container>
</template>

<script>
import { mapActions } from "vuex";
import ListItem from "@/components/ListItem/index.vue";
import CreateItem from "@/components/CreateItem/index";
import Search from "@/components/Search/index.vue";
export default {
    components: {
        ListItem,
        CreateItem,
        Search,
    },
    data() {
        return {
            page: 1,
            items: [],
            infiniteId: +new Date(),
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
        itemSearch(item) {
            this.items = [item]
        },
        reload() {
            this.page = 1
            this.items = []
            this.infiniteId += 1
        }
    }
};
</script>
<template>
    <v-card>
        <v-card-text>
            <div>{{ name }}</div>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="editItem">Editar</v-btn>
            <v-btn color="error" @click="deleteItem">Excluir</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    computed: {
        name() {
            return this.item.name;
        },
    },
    methods: {
        editItem() {
            // Lógica para editar o item
        },
        deleteItem() {
            // Lógica para excluir o item
        },
    },
};
</script>
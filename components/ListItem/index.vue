<template>
    <v-card>
        <v-card-text>
            <div>{{ name }}</div>
            <div>Id: {{ Id }}</div>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" @click="openEditDialog">Edit</v-btn>
            <v-btn color="error" @click="deleteItem">Delete</v-btn>
        </v-card-actions>
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-card-title>
                    <span class="headline"> Edit Item </span>
                </v-card-title>
                <v-card-text>
                    <v-text-field v-model="editingItem.name" label="Name"></v-text-field>
                    <v-switch v-model="switchValue" label="Active" @input="handleSwitchInput"></v-switch>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" text @click="cancelEdit">Cancel</v-btn>
                    <v-btn color="primary" @click="saveEdit">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            dialog: false,
            editItem: false,
            editingItem: {
                active: 0,
                id: 0,
                name: '',
                order: 0,
            },
            switchValue: false,
        };
    },
    computed: {
        name() {
            return this.item.name;
        },
        Id() {
            return this.item.id;
        },
    },
    methods: {
        ...mapActions(['updateHouseRules', 'deleteHouseRules']),
        openEditDialog() {
            this.editingItem = { ...this.item }
            this.switchValue = this.editingItem.active === 1
            this.dialog = true
        },
        cancelEdit() {
            this.dialog = false
        },
        handleSwitchInput(value) {
            this.switchValue = value ? 1 : 0
        },
        async saveEdit() {
            const response = await this.updateHouseRules({ houseRules: this.editingItem })
            if (response.success) {
                this.$notifier.showMessage({ content: 'Item updated successfully', color: 'success' })
                this.$emit('update')
                this.dialog = false
            } else {
                this.$notifier.showMessage({ content: 'Error updating item', color: 'error' })
            }
        },
        async deleteItem() {
            const response = await this.deleteHouseRules({ houseRules: this.item })
            if (response.success) {
                this.$notifier.showMessage({ content: 'Item deleted successfully', color: 'success' })
                this.$emit('update')
            } else {
                this.$notifier.showMessage({ content: 'Error deleting item', color: 'error' })
            }
        },
    },
};
</script>
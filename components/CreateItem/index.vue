<template>
    <div>
        <v-dialog v-model="dialogVisible" max-width="500px" persistent>
            <v-card>
                <v-card-title>
                    <span class="headline">Criar Item</span>
                </v-card-title>

                <v-card-text>
                    <v-text-field
                        v-model="form.name" label="Name"
                        :rules="[v => !!v || 'Name is required']"
                        />
                    <v-checkbox v-model="form.active" label="Active"/>
                </v-card-text>

                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="primary" @click="createItem">Save</v-btn>
                    <v-btn color="secondary" @click="closeDialog">Cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            dialogVisible: false,
            form: {
                name: '',
                active: false,
            },
        }
    },
    created() {
        this.showDialog()
    },
    methods: {
        ...mapActions(['createHouseRules']),
        showDialog() {
            this.dialogVisible = true
        },
        closeDialog() {
            this.dialogVisible = false
            this.$router.push({ name: 'home' })
        },
        async createItem() {
            if (!this.form.name) {
                this.$notifier.showMessage({
                    content: 'Name is required',
                    color: 'error',
                })
                return
            }
            this.form.active = this.form.active ? 1 : 0
            const response = await this.createHouseRules({ houseRules: this.form })

            if (response.success) {
                this.$notifier.showMessage({
                    content: 'Item created successfully',
                    color: 'success',
                })
            } else {
                this.$notifier.showMessage({
                    content: 'Error creating item',
                    color: 'error',
                })
            }
            this.dialogVisible = false
            this.$router.push({ name: 'home' })
            this.$emit('update')
        },
    },
};
</script>
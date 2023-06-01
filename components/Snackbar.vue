<template>
    <v-snackbar
		v-model="showSnackbar"
		timeout="2500"
		centered
		top
		:color="snackbarColor"
		transition="slide-y-reverse-transition"
		>
			{{ snackbarText }}
	</v-snackbar>
</template>

<script>
export default {
    data() {
        return {
            showSnackbar: false,
            snackbarText: '',
			snackbarColor: ''
        }
    },
    created() {
        this.$store.subscribe((mutation, state) => {
            if (mutation.type === 'snackbar/showMessage') {
                this.snackbarText = state.snackbar.content
                this.snackbarColor = state.snackbar.color
                this.showSnackbar = true
            }
        })
    }
}
</script>
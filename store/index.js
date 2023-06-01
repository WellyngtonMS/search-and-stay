const getDefaultState = () => {
    return {
        houseRules: [],
        auth: {
            loggedIn: false
        }
    }
}

export const state = () => getDefaultState()

export const mutations = {
    setHouseRules(state, { houseRules }) {
        state.houseRules = houseRules
    },
    isLoggedIn (state) {
        state.auth.loggedIn = true
    },
    resetState(state) {
        Object.assign(state, getDefaultState())
    }
}

export const actions = {   
    getHouseRules() {
        return this.$axios.$get('/').then((response) => {
            this.commit('setHouseRules', { houseRules: response.data })
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const getters = {
    isAuthenticated (state) {
        return state.auth.loggedIn
    }    
}
const getDefaultState = () => {
    return {
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
    logout (state) {
        state.auth.loggedIn = false
        localStorage.removeItem('token')
    },
    resetState(state) {
        Object.assign(state, getDefaultState())
    }
}

export const actions = {   
    getHouseRules(context, { pageNumber }) {
        return this.$axios.$get('/',{
            params: {
                page: pageNumber ? pageNumber : 1
            }
        }).catch((error) => {
            console.log(error)
        })
    },
    getHouseRulesById(context, { houseRulesId }) {
        return this.$axios.$get('/' + houseRulesId).catch((error) => {
            console.log(error)
        })
    },
    createHouseRules(context, { houseRules }) {
        return this.$axios.$post('/', {
            house_rules: houseRules
        }).catch((error) => {
            console.log(error)
        })
    },
    updateHouseRules(context, { houseRules }) {
        return this.$axios.$put('/' + houseRules.id, {
            house_rules: houseRules
        }).catch((error) => {
            console.log(error)
        })
    },
    deleteHouseRules(context, { houseRules }) {
        return this.$axios.$delete('/' + houseRules.id).catch((error) => {
            console.log(error)
        })
    }
}

export const getters = {
    isAuthenticated (state) {
        return state.auth.loggedIn
    }    
}
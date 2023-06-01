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
    }
}

export const getters = {
    isAuthenticated (state) {
        return state.auth.loggedIn
    }    
}
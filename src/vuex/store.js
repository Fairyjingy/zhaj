import Vue from 'vue'
import Vuex from 'vuex'
import * as actions from './actions'
import getters from './getters'

import createPersistedState from 'vuex-persistedstate'
Vue.use(Vuex)

// 应用初始状态
const state = {
    
    elements: undefined,
    user_permissions: {},
}

// 定义所需的 mutations
const mutations = {
    SET_ELEMENTS: (state, elements) => {
        state.elements = elements;
    },
    SET_ELEMENTS_User: (state, user_permissions) => {
        state.user_permissions = user_permissions;
    },

}

// 创建 store 实例
export default new Vuex.Store({
    actions,
    getters,
    state,
    mutations,
    
  plugins: [createPersistedState()]
})
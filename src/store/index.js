import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    collapsed: false, // 菜单栏是否闭合，true是闭合，false是不闭合
  },
  mutations: {
    reviseCollapsed(state) { // 修改当前是否显示
      state.collapsed = !state.collapsed;
    },
  },
  actions: {
    reviseCollapsed({ commit }) {
      commit('reviseCollapsed');
    },
  },
  modules: {
  },
});

import Vue from 'vue';
import Vuex from 'vuex';
import { setCookie, getCookie, deteCookie } from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 菜单栏是否闭合，true是闭合，false是不闭合
    collapsed: false,
    user: {
      username: getCookie().username,
      appkey: getCookie().appkey,
      email: getCookie().email,
      role: getCookie().reol,
    },
  },
  mutations: {
    // 修改当前是否显示
    reviseCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    // 设置用户数据
    setUser(state, payload) {
      state.user = payload;
    },
    // 删除用户数据
    deteUser(state) {
      state.user = {
        username: '',
        appkey: '',
        email: '',
        role: '',
      };
    },
  },
  actions: {
    reviseCollapsed({ commit }) {
      commit('reviseCollapsed');
    },
    setUser({ commit }, payload) {
      commit('setUser', payload);
      // 设置cookie
      setCookie(payload);
    },
    deteUser({ commit }) {
      commit('deteUser');
      // 删除cookie
      deteCookie();
    },
  },
  modules: {
  },
});

<template>
    <div class="home">
        <Menu />
        <div
            class="main-app"
            :class="{ 'menu-unfold': $store.state.collapsed }"
        >
        <Header />
        <router-view :key="new Date().getTime()"></router-view>
        </div>
    </div>
</template>

<script>
import Header from './components/header.vue';
import Menu from './components/menu.vue';

export default {
  data() {
    return {};
  },
  components: {
    Header,
    Menu,
  },
  /* data() {
        return {
            collapsed: false,
        };
    },
    methods: {
        toggleCollapsed() {
            this.collapsed = !this.collapsed;
        },
    }, */
};
</script>

<style lang="less">
@import "~@/assets/css/home.less";
</style>

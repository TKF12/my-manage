<template>
    <div class="main-header">
        <a-button
            type="primary"
            style="margin-bottom: 16px"
            @click="toggleCollapsed"
        >
            <a-icon
                :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'"
            />
        </a-button>
        <a-breadcrumb>
            <a-breadcrumb-item>{{
                currentRoute.matched[0].meta.title
            }}</a-breadcrumb-item>
            <a-breadcrumb-item>
                <router-link to="">{{ currentRoute.meta.title }}</router-link>
            </a-breadcrumb-item>
        </a-breadcrumb>
        <ul class="user-info">
            <li>
                欢迎，{{ $store.state.user.username }}
                <a-icon type="down" />
            </li>
            <li @click="loginOut">退出登录</li>
        </ul>
    </div>
</template>
<script>
export default {
  data() {
    return {
      // 当前router数据
      currentRoute: this.$router.currentRoute,
    };
  },
  watch: {
    // 路由发生变化时，获取最新路由信息
    $route() {
      this.currentRoute = this.$router.currentRoute;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('reviseCollapsed');
    },
    // 退出登录
    loginOut() {
      this.$router.push({
        name: 'Login',
      });
      // 删除登录信息
      this.$store.dispatch('deteUser');
    },
  },
};
</script>

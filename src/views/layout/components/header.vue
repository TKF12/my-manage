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
            <a-breadcrumb-item>首页</a-breadcrumb-item>
            <a-breadcrumb-item><a href="">统计</a></a-breadcrumb-item>
        </a-breadcrumb>
        <ul class="user-info">
            <li>欢迎，{{$store.state.user.username}} <a-icon type="down" /></li>
            <li @click="loginOut">退出登录</li>
        </ul>
    </div>
</template>
<script>
export default {
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

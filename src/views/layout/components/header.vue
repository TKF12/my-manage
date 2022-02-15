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
            <li>欢迎，{{$store.state.username}} <a-icon type="down" /></li>
            <li>退出登录</li>
        </ul>
    </div>
</template>
<script>
export default {
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('reviseCollapsed');
    },
  },
};
</script>

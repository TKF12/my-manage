<template>
    <div class="menu-list">
        <a-menu
            :default-selected-keys="[
                $router.currentRoute.name === 'Home'
                    ? 'Index'
                    : $router.currentRoute.name,
            ]"
            :default-open-keys="[$router.currentRoute.matched[0].name]"
            mode="inline"
            theme="dark"
            :inline-collapsed="$store.state.collapsed"
        >
            <template v-for="n in $store.state.routes">
                <a-sub-menu v-if="n.meta.show" :key="n.name">
                    <span slot="title">
                        <a-icon :type="n.meta.icon" />
                        <span>{{ n.meta.title }}</span>
                    </span>
                    <template v-for="sta in n.children">
                        <a-menu-item v-if="sta.meta.show" :key="sta.name">
                            <router-link :to="{ name: sta.name }">
                                <a-icon :type="sta.meta.icon" />
                                {{ sta.meta.title }}
                            </router-link>
                        </a-menu-item>
                    </template>
                </a-sub-menu>
            </template>
        </a-menu>
    </div>
</template>
<script>
export default {
  created() {
    // console.log(this.$store.state.routes);
  },
};
</script>

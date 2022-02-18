<template>
    <div class="menu-list">
        <a-menu
            :default-selected-keys="[$router.currentRoute.name === 'Home' ?
                                    'Index':$router.currentRoute.name]"
            :default-open-keys="[$router.currentRoute.matched[0].name]"
            mode="inline"
            theme="dark"
            :inline-collapsed="$store.state.collapsed"
        >
            <a-sub-menu v-for="n in $store.state.routes" :key="n.name">
                <span slot="title">
                    <a-icon :type="n.meta.icon" />
                    <span>{{ n.meta.title }}</span>
                </span>
                <a-menu-item v-for="sta in n.children" :key="sta.name">
                    <router-link :to="{name: sta.name}">
                        <a-icon :type="sta.meta.icon" />
                        {{ sta.meta.title }}
                    </router-link>
                </a-menu-item>
            </a-sub-menu>
        </a-menu>
    </div>
</template>
<script>
export default {
};
</script>

<template>
    <Component v-bind="layoutAttrs" :is="DefaultLayoutWithVerticalNav" />
</template>

<script lang="ts" setup>
    const DefaultLayoutWithVerticalNav = defineAsyncComponent(() => import('./components/DefaultLayoutWithVerticalNav.vue'))
    const { layoutAttrs, injectSkinClasses } = useSkins()

    injectSkinClasses()
</script>

<style lang="scss">
    // As we are using `layouts` plugin we need its styles to be imported
    @use '@layouts/styles/default-layout';
</style>

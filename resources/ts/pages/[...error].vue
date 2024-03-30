<template>
    <div class="misc-wrapper">
        <ErrorHeader status-code="404" title="Page Not Found ⚠️" description="We couldn't find the page you are looking for." />

        <VBtn to="/" class="mb-11"> Back to Home </VBtn>
    </div>
</template>

<script setup lang="ts">
    definePage({
        alias: '/pages/misc/not-found/:error(.*)',
        meta: {
            layout: 'blank',
            public: true
        }
    })
</script>

<style lang="scss">
    @use '@core-scss/template/pages/misc.scss';
</style>

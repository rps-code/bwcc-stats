<template>
    <VerticalNavLayout :nav-items="navItems">
        <!-- 👉 navbar -->
        <template #navbar="{ toggleVerticalOverlayNavActive }">
            <div class="d-flex h-100 align-center">
                <v-select v-model="selectedServer" :items="serverOptions" density="compact" label="Server" class="mr-4"></v-select>

                <IconBtn id="vertical-nav-toggle-btn" class="d-lg-none" @click="toggleVerticalOverlayNavActive(true)">
                    <VIcon size="26" icon="tabler-menu-2" />
                </IconBtn>

                <v-menu :close-on-content-click="false">
                    <template v-slot:activator="{ props }">
                        <IconBtn v-bind="props">
                            <VIcon size="24" icon="tabler-info-circle" />
                        </IconBtn>
                    </template>

                    <v-card max-width="300">
                        <p class="info__content">
                            This web app is in <b>BETA</b> and may not function as expected. I am open to suggestions/bug reports on my
                            Discord below.<br /><br />Please note that all data is from <b>16/03/24</b> onwards due to a technical issue.<br /><br />Created
                            by .rps (Discord)
                        </p>
                    </v-card>
                </v-menu>

                <IconBtn @click="openUrl('https://discord.gg/bwcc')">
                    <VIcon size="26" icon="tabler-brand-discord" />
                </IconBtn>

                <NavbarThemeSwitcher />

                <VSpacer />

                <NavBarI18n
                    v-if="themeConfig.app.i18n.enable && themeConfig.app.i18n.langConfig?.length"
                    :languages="themeConfig.app.i18n.langConfig"
                />
            </div>
        </template>

        <AppLoadingIndicator ref="refLoadingIndicator" />

        <!-- 👉 Pages -->
        <RouterView v-slot="{ Component }">
            <Suspense :timeout="0" @fallback="isFallbackStateActive = true" @resolve="isFallbackStateActive = false">
                <Component :is="Component" />
            </Suspense>
        </RouterView>

        <!-- 👉 Footer -->
        <template #footer>
            <Footer />
        </template>
    </VerticalNavLayout>
</template>

<script lang="ts" setup>
    import navItems from '@/navigation/vertical'
    import { themeConfig } from '@themeConfig'

    import Footer from '@/layouts/components/Footer.vue'
    import NavbarThemeSwitcher from '@/layouts/components/NavbarThemeSwitcher.vue'
    import NavBarI18n from '@core/components/I18n.vue'
    import { VerticalNavLayout } from '@layouts'
    import server from '@core/stores/server'

    const isFallbackStateActive = ref(false)
    const refLoadingIndicator = ref<any>(null)

    const serverOptions = ['BWCC #1', 'BWCC #2']

    const selectedServer = computed({
        get: () => (server.state.isServerOne ? 'BWCC #1' : 'BWCC #2'),
        set: newValue => {
            server.methods.setIsServerOne(newValue === 'BWCC #1')
        }
    })

    watch(
        [isFallbackStateActive, refLoadingIndicator],
        () => {
            if (isFallbackStateActive.value && refLoadingIndicator.value) refLoadingIndicator.value.fallbackHandle()

            if (!isFallbackStateActive.value && refLoadingIndicator.value) refLoadingIndicator.value.resolveHandle()
        },
        { immediate: true }
    )

    function openUrl(url: string): void {
        window.open(url, '_blank')?.focus()
    }
</script>

<style lang="scss" scoped>
    .info__content {
        font-size: 0.8rem;
        padding: 0.8rem;
        margin-bottom: 0;
    }
</style>

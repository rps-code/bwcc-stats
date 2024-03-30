<template>
    <VCol cols="12">
        <VCard>
            <VCardItem class="pb-4 w-50">
                <VCardTitle>Most Played Maps</VCardTitle>
                <VCardSubtitle>The most common maps</VCardSubtitle>
            </VCardItem>

            <VCardText v-if="isLoading">
                <p>Loading map data...</p>
            </VCardText>
            <VCardText v-else-if="chartSeries.length">
                <vue-apex-charts :options="chartOptions" :series="chartSeries" type="bar"></vue-apex-charts>
            </VCardText>
            <VCardItem v-else>
                <p>Unable to load map data!</p>
            </VCardItem>
        </VCard>
    </VCol>
</template>

<script setup lang="ts">
    import { MapStatsResponse } from '@/views/types/mapstats'
    import { useConfigStore } from '@core/stores/config'

    const configStore = useConfigStore()
    var theme = ref(configStore.theme)

    watch(
        () => configStore.theme,
        () => {
            theme.value = configStore.theme
        },
        { deep: true }
    )

    const props = defineProps<{
        stats: MapStatsResponse
        isLoading: boolean
    }>()

    const mapFrequency = computed(() => {
        const frequency: Record<string, number> = {}
        props.stats.forEach(stat => {
            const formattedName = formatMapName(stat.name)
            if (!frequency[formattedName]) {
                frequency[formattedName] = 1
            } else {
                frequency[formattedName]++
            }
        })
        return frequency
    })

    const chartSeries = computed(() => [
        {
            name: 'Map Frequency',
            data: Object.values(mapFrequency.value)
        }
    ])

    const chartOptions = computed(() => {
        return {
            chart: {
                type: 'bar',
                stacked: true,
                toolbar: {
                    show: false
                }
            },
            labels: Object.values(mapFrequency.value),
            xaxis: {
                categories: Object.keys(mapFrequency.value),
                labels: {
                    style: {
                        colors: theme.value === 'dark' ? '#fff' : '#000'
                    }
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: theme.value === 'dark' ? '#fff' : '#000'
                    }
                }
            },
            colors: ['#1c1d32'],
            tooltip: {
                y: {
                    formatter: function (value: number) {
                        return `${value} Games`
                    }
                },
                marker: {
                    show: false
                }
            },
            states: {
                hover: {
                    filter: {
                        type: 'color',
                        value: '#6f64e7'
                    }
                }
            }
        }
    })
</script>

<style lang="scss" scoped>
    .v-theme--dark {
        :deep(.apexcharts-tooltip) {
            background-color: #1c1d32 !important;
            color: #fff;
            border-color: #1c1d32 !important;
        }

        :deep(.apexcharts-tooltip-title) {
            background-color: #1c1d32 !important;
            color: #ffffff !important;
        }
    }
</style>

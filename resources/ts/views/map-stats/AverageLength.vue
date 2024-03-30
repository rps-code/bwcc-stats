<template>
    <VCol cols="12">
        <VCard>
            <VCardItem class="pb-4 w-50">
                <VCardTitle>Average Game Lengths</VCardTitle>
                <VCardSubtitle>Average length of games in minutes</VCardSubtitle>
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

    const mapAverageLengths = computed(() => {
        const lengths = props.stats.map(stat => {
            // Ensure start is less than end before calculating duration
            const durationSeconds = Math.max(stat.end - stat.start, 0)
            const durationMinutes = durationSeconds / 60
            return {
                name: formatMapName(stat.name),
                duration: durationMinutes
            }
        })

        const averages = {} as any
        lengths.forEach(l => {
            if (!averages[l.name]) {
                averages[l.name] = { total: l.duration, count: 1 }
            } else {
                averages[l.name].total += l.duration
                averages[l.name].count += 1
            }
        })

        return Object.keys(averages).map(key => ({
            x: key,
            y: averages[key].total / averages[key].count
        }))
    })

    const chartSeries = computed(() => [
        {
            name: 'Average Game Length',
            data: mapAverageLengths.value
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
            xaxis: {
                categories: mapAverageLengths.value.map(item => item.x),
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
                    },
                    formatter: function (val: string) {
                        return `${parseFloat(val).toFixed(0)}`
                    }
                }
            },
            dataLabels: {
                enabled: true,
                formatter: function (val: string) {
                    return `${parseFloat(val).toFixed(0)}`
                }
            },
            states: {
                hover: {
                    filter: {
                        type: 'color',
                        value: '#6f64e7'
                    }
                }
            },
            colors: ['#1c1d32'],
            tooltip: {
                y: {
                    formatter: function (val: string) {
                        return `${parseFloat(val).toFixed(0)} minutes`
                    }
                },
                marker: {
                    show: false
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

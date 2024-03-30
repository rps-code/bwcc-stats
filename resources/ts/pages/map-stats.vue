<template>
    <VRow class="match-height">
        <TileStats :stats="stats" :isLoading="isLoading" />
        <VCol cols="12">
            <MostPlayed :stats="stats" :isLoading="isLoading" />
        </VCol>
        <VCol cols="12">
            <AverageLength :stats="stats" :isLoading="isLoading" />
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
    import MostPlayed from '@/views/map-stats/MostPlayed.vue'
    import AverageLength from '@/views/map-stats/AverageLength.vue'
    import TileStats from '@/views/map-stats/TileStats.vue'
    import { MapStatsResponse } from '@/views/types/mapstats'

    const isLoading = ref(true)

    var stats = reactive<MapStatsResponse>([
        {
            name: 'kursk_warfare_night',
            start: 1711372126,
            end: 1711372127,
            guessed: false
        }
    ])

    const fetchMapStats = async () => {
        try {
            const res = await $api('/gameserver/get_map_history', {
                method: 'GET',
                onResponseError: ({ response }) => console.error(response._data.errors)
            })

            Object.assign(stats, JSON.parse(res))
            isLoading.value = false
        } catch (err) {
            console.error(err)
            isLoading.value = false
        }
    }

    fetchMapStats()
</script>

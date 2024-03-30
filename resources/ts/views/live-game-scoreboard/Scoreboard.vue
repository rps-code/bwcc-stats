<template>
    <Scoreboard
        title="Live Game Scoreboard"
        :showButton="true"
        :isLoading="isLoading"
        :stats="liveStats.stats"
        :fetchStats="fetchLiveStats"
        :isRefreshButtonDisabled="isButtonDisabled"
    />
</template>

<script setup lang="ts">
    import { LiveStatsResponse } from '@/views/types/topdogs'
    import Scoreboard from '@/layouts/components/Scoreboard.vue'

    const isLoading = ref(true)
    const isButtonDisabled = ref(false)

    var liveStats = reactive<LiveStatsResponse>({
        snapshot_timestamp: Date.now(),
        stats: [
            {
                player: 'N/A',
                steam_id_64: '1234567890',
                steaminfo: null,
                kills: 0,
                kills_streak: 0,
                deaths: 0,
                death_by_weapons: { NoWeapon: 0 },
                deaths_without_kill_streak: 0,
                teamkills: 0,
                teamkills_streak: 0,
                deaths_by_tk: 0,
                deaths_by_tk_streak: 0,
                nb_vote_started: 0,
                nb_voted_yes: 0,
                nb_voted_no: 0,
                longest_life_secs: 0,
                shortest_life_secs: 0,
                last_spawn: 'Loading',
                time_seconds: 0,
                weapons: { NoWeapon: 0 },
                death_by: { Opponent1: 0 },
                most_killed: { Opponent3: 0 },
                combat: 0,
                offense: 0,
                defense: 0,
                support: 0,
                kills_per_minute: 0,
                deaths_per_minute: 0,
                kill_death_ratio: 0
            }
        ]
    })

    const fetchLiveStats = async () => {
        if (isButtonDisabled.value) return

        isButtonDisabled.value = true
        isLoading.value = true

        setTimeout(() => {
            isButtonDisabled.value = false
        }, 10000)

        try {
            const res = await $api('/gameserver/get_live_game_stats', {
                method: 'GET',
                onResponseError: ({ response }) => console.error(response._data.errors)
            })

            Object.assign(liveStats, JSON.parse(res))
            isLoading.value = false
        } catch (err) {
            console.error(err)
            isLoading.value = false
        }
    }

    fetchLiveStats()
</script>

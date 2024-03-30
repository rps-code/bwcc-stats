<template>
    <template v-if="isLoading">
        <h3 class="text-center pb-5">Loading...</h3>
    </template>
    <div v-else class="game-history-detail">
        <div class="game-history__tile pa-5" :style="getBackground(game.map_name)">
            <div class="game-history__tile__content">
                <div class="d-flex w-100 justify-space-between mb-3">
                    <VChip size="large" color="primary" style="background: #2f3349" @click="openGameHistory()">Back to Game History</VChip>
                    <VChip size="large" color="primary" style="background: #2f3349">
                        <v-tooltip location="bottom">
                            <template v-slot:activator="{ props }">
                                <IconBtn v-bind="props" @click="shareGameStats(game.id)">
                                    <VIcon color="primary" size="26" icon="tabler-link" />
                                </IconBtn>
                            </template>
                            <span>{{ tooltipText }}</span>
                        </v-tooltip>
                    </VChip>
                </div>
                <h1 class="mb-5">{{ formatMapName(game.map_name) }}</h1>
                <div class="date-container d-flex align-center justify-center mb-6">
                    <div class="date-container__start d-flex flex-column align-center">
                        <p class="date-container__date">{{ getDate(game.start) }}</p>
                        <p class="date-container__time">{{ getTime(game.start) }}</p>
                    </div>
                    <span class="date-container__spacer">➜</span>
                    <div class="date-container__end d-flex flex-column align-center">
                        <p class="date-container__date">{{ getDate(game.end) }}</p>
                        <p class="date-container__time">{{ getTime(game.end) }}</p>
                    </div>
                </div>
                <p class="time-elapsed mb-10 d-flex align-center justify-center">
                    <VIcon size="18" icon="tabler-clock" class="mr-1" /> {{ getTimeElapsed(game.start, game.end) }}
                </p>
            </div>
        </div>
        <Scoreboard :title="`${getDate(game.start)} Scoreboard`" :showButton="false" :isLoading="isLoading" :stats="game.player_stats" />
    </div>
</template>

<script setup lang="ts">
    import Scoreboard from '@/layouts/components/Scoreboard.vue'
    import { Game } from '@/views/types/gameid'
    import { useRoute, useRouter } from 'vue-router'

    const router = useRouter()
    const route = useRoute()
    const tooltipText = ref('Copy link')
    const isLoading = ref(true)

    var gameId: string

    'gameId' in route.params && typeof route.params.gameId === 'string'
        ? (gameId = route.params.gameId)
        : console.error('gameId is missing or not a string')

    var game = reactive<Game>({
        id: 1,
        creation_time: '2024-03-16T16:59:53.928',
        start: '2024-03-16T14:33:39',
        end: '2024-03-16T15:07:16',
        server_number: 1,
        map_name: 'carentan_warfare',
        player_stats: [
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

    const fetchGame = async () => {
        try {
            const res = await $api('/gameserver/get_map_scoreboard', {
                params: { gameId },
                method: 'GET',
                onResponseError: ({ response }) => console.error(response._data.errors)
            })

            Object.assign(game, JSON.parse(res))
        } catch (err) {
            console.error(err)
        } finally {
            isLoading.value = false
        }
    }

    fetchGame()

    function shareGameStats(gameId: number) {
        const url = `${window.location.origin}/game-history/${gameId}`
        navigator.clipboard
            .writeText(url)
            .then(() => {
                tooltipText.value = 'Link copied'
                setTimeout(() => (tooltipText.value = 'Copy link'), 2000)
            })
            .catch(err => {
                console.error('Failed to copy:', err)
            })
    }

    function openGameHistory() {
        router.push('/game-history')
    }
</script>

<style lang="scss" scoped>
    .game-history__tile {
        border-radius: 6px;
        position: relative;
        background-position: center;
        background-size: cover;
        box-shadow: 0 3px 12px rgba(var(--v-shadow-key-umbra-color), var(--v-shadow-md-opacity)), 0 0 transparent, 0 0 transparent;
        transition: all 0.5s ease;

        &::after {
            position: absolute;
            background: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            display: block;
            content: '';
            top: 0;
            border-radius: 6px;
            left: 0;
        }

        .time-elapsed {
            font-size: 0.8rem;
        }

        &__content {
            z-index: 1;
            position: relative;

            h1,
            h2,
            p {
                color: white;
                text-align: center;
            }
        }

        .date-container {
            &__spacer {
                color: #d0be76;
                font-size: 1.25rem;
                line-height: 1;
                margin: 0 1.5rem;
            }

            &__date,
            &__time {
                margin: 0;
            }

            &__date {
                font-size: 0.8rem;
                color: #d0be76;
            }

            &__time {
                font-weight: bold;
                font-size: 1.1rem;
            }
        }
    }
</style>

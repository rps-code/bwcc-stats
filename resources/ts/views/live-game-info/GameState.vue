<template>
    <div class="gamestate d-flex flex-column align-center justify-center py-15" :style="backgroundStyle">
        <IconBtn @click="fetchGameState" :disabled="isButtonDisabled" class="refresh-btn">
            <VIcon size="26" icon="tabler-refresh" />
            <v-tooltip activator="parent" location="bottom" class="text-center"
                >Refresh Data<br /><small>(10 second cooldown)</small></v-tooltip
            >
        </IconBtn>
        <div v-if="isOffline" class="gamestate__header text-center mb-7">
            <h2 class="title d-flex align-center">
                <p class="mr-3">OFFLINE</p>
            </h2>
        </div>
        <div v-else class="gamestate__header text-center mb-7">
            <h2 class="title d-flex align-center">
                <VChip size="small" color="error" class="mr-3">
                    <span class="font-weight-medium"
                        ><div class="live-dot ml-2 mr-2"></div>
                        LIVE</span
                    >
                </VChip>
                <p class="mr-3">LIVE GAME</p>
                <v-chip v-if="totalPlayers < 50" class="chip" prepend-icon="tabler-ban" variant="elevated" color="#ffc107">
                    Seeding
                </v-chip>
                <v-chip v-else class="chip" prepend-icon="tabler-check" variant="elevated" color="#198754"> Seeded </v-chip>
            </h2>
            <p class="map">{{ formatMapName(gameState.current_map) }}</p>
        </div>
        <div class="gamestate__content d-flex align-center">
            <div class="axis d-flex flex-column align-end">
                <p class="title mb-1 text-right">AXIS</p>
                <p class="players">{{ gameState.num_axis_players }} players</p>
            </div>
            <div class="score mx-12">
                <p class="time text-center">{{ gameState.raw_time_remaining }}</p>
                <p class="board mb-2">{{ gameState.axis_score }} - {{ gameState.allied_score }}</p>
                <p class="players text-center">{{ totalPlayers }} TOTAL PLAYERS</p>
            </div>
            <div class="allies d-flex flex-column align-start">
                <p class="title mb-1">ALLIES</p>
                <p class="players">{{ gameState.num_allied_players }} players</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { GameStateResponse } from '@/views/types/gamestate'

    const isButtonDisabled = ref(false)

    var gameState = reactive<GameStateResponse>({
        num_allied_players: 0,
        num_axis_players: 0,
        allied_score: 0,
        axis_score: 0,
        time_remaining: '',
        raw_time_remaining: '',
        current_map: '',
        next_map: ''
    })

    const fetchGameState = async () => {
        if (isButtonDisabled.value) return

        isButtonDisabled.value = true

        setTimeout(() => {
            isButtonDisabled.value = false
        }, 10000)

        try {
            const res = await $api('/gameserver/get_gamestate', {
                method: 'GET',
                onResponseError: ({ response }) => console.error(response._data.errors)
            })

            Object.assign(gameState, JSON.parse(res))
        } catch (err) {
            console.error(err)
        }
    }

    fetchGameState()

    const totalPlayers = computed(() => {
        return gameState.num_axis_players + gameState.num_allied_players
    })

    const isOffline = computed(() => {
        return gameState.current_map.length === 0
    })

    const backgroundStyle = computed(() => ({
        backgroundImage: `url('/images/maps/${getFirstWord(gameState.current_map)}.jpg')`
    }))

    function getFirstWord(input: string) {
        return input.split('_')[0]
    }
</script>

<style lang="scss">
    .gamestate {
        border-radius: 6px;
        position: relative;
        background-position: center;
        background-size: cover;
        box-shadow: 0 3px 12px rgba(var(--v-shadow-key-umbra-color), var(--v-shadow-md-opacity)), 0 0 transparent, 0 0 transparent;

        &::after {
            position: absolute;
            background: rgba(0, 0, 0, 0.5);
            width: 100%;
            height: 100%;
            display: block;
            content: '';
            top: 0;
            border-radius: 6px;
        }

        &__header,
        &__content {
            z-index: 1;
            position: relative;
        }

        &__header {
            .title {
                color: white;
                font-size: 1.75rem;

                .chip {
                    height: 24px;
                    padding: 0 8px;
                }
            }

            .map {
                font-size: 1.2rem;
            }
        }

        &__content {
            .axis,
            .allies {
                .title {
                    font-size: 3.25rem;
                    color: white;
                    font-weight: bold;
                    line-height: 1;
                    width: 184px;
                }

                .players {
                    font-size: 1.1rem;
                }
            }

            .axis .players {
                color: #4197d6;
            }

            .allies .players {
                color: #bf7d72;
            }

            .score {
                .time {
                    color: white;
                    font-size: 1.1rem;
                }

                .board {
                    color: #d0be76;
                    font-size: 5rem;
                    font-weight: bold;
                    line-height: 1;
                }
            }
        }

        p {
            margin-bottom: 0;
        }

        .refresh-btn {
            z-index: 1;
            position: absolute;
            top: 1rem;
            right: 1rem;
        }
    }
</style>

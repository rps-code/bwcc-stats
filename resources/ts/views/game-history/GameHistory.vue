<template>
    <div v-if="isLoading" class="loading-overlay">
        <div class="loading">
            <div class="effect-1 effects"></div>
            <div class="effect-2 effects"></div>
            <div class="effect-3 effects"></div>
        </div>
    </div>
    <div v-if="!initialLoad" class="d-flex flex-wrap">
        <VRow class="mb-4 w-100">
            <VCol cols="12">
                <VCard>
                    <VCardText class="d-flex align-center">
                        <h4 class="mr-5">Filter By</h4>
                        <AppDateTimePicker
                            v-model="filterDate"
                            :max="new Date().toISOString().split('T')[0]"
                            placeholder="Select Date"
                            style="width: 220px"
                        ></AppDateTimePicker>
                        <v-select
                            v-model="selectedMapName"
                            :items="mapNames"
                            label="Select Map"
                            return-object
                            style="width: 200px"
                            clearable
                            class="ml-4 d-inline-block"
                        ></v-select>
                    </VCardText>
                </VCard>
            </VCol>
        </VRow>
        <div class="game-history d-flex flex-wrap w-100">
            <div v-for="map in filteredMaps" class="pa-2 w-33" @click="selectMap(map.id)">
                <div class="game-history__tile pa-5" :style="getBackground(map.just_name)">
                    <div class="game-history__tile__content">
                        <h2 class="mb-1">{{ map.long_name }}</h2>
                        <div class="date-container d-flex align-center justify-center mt-3">
                            <div class="date-container__start d-flex flex-column align-center">
                                <p class="date-container__date">{{ getDate(map.start) }}</p>
                                <p class="date-container__time">{{ getTime(map.start) }}</p>
                            </div>
                            <span class="date-container__spacer">➜</span>
                            <div class="date-container__end d-flex flex-column align-center">
                                <p class="date-container__date">{{ getDate(map.end) }}</p>
                                <p class="date-container__time">{{ getTime(map.end) }}</p>
                            </div>
                        </div>
                        <p class="time-elapsed mb-0 mt-3 d-flex align-center justify-center">
                            <VIcon size="16" icon="tabler-clock" class="mr-1" /> {{ getTimeElapsed(map.start, map.end) }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="w-100 mt-3 d-flex justify-end">
                <v-pagination v-model="currentPage" :length="totalPages" :total-visible="7"></v-pagination>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { GameHistoryResponse } from '@/views/types/gamehistory'

    const filterDate = ref('')
    const selectedMapName = ref('')
    const router = useRouter()
    const isLoading = ref(true)
    const initialLoad = ref(true)
    const currentPage = ref(1)
    const pageSize = ref(12)
    const totalMaps = ref(0)

    var gameHistory = reactive<GameHistoryResponse>({
        page: 1,
        page_size: 100,
        total: 147,
        maps: [
            {
                just_name: 'kursk',
                long_name: 'Kursk',
                id: 147,
                creation_time: '2024-03-28T15:34:32.107',
                start: '2024-03-28T02:01:03',
                end: '2024-03-28T15:26:49',
                server_number: 1,
                map_name: 'kursk_warfare',
                player_stats: []
            }
        ]
    })

    const fetchGameHistory = async (page: number, limit: number) => {
        isLoading.value = true
        try {
            const res = await $api('/gameserver/get_scoreboard_maps', {
                params: { page, limit },
                method: 'GET',
                onResponseError: ({ response }) => console.error(response._data.errors)
            })

            Object.assign(gameHistory, JSON.parse(res))
            totalMaps.value = gameHistory.total
        } catch (err) {
            console.error(err)
        } finally {
            isLoading.value = false
            initialLoad.value = false
        }
    }

    fetchGameHistory(currentPage.value, pageSize.value)

    watch(currentPage, newPage => {
        fetchGameHistory(newPage, pageSize.value)
    })

    const totalPages = computed(() => Math.ceil(totalMaps.value / pageSize.value))

    const filteredMaps = computed(() => {
        return gameHistory.maps.filter(map => {
            const matchesDate = filterDate.value ? getDate(map.start) === filterDate.value : true
            const matchesMapName = selectedMapName.value ? map.long_name === selectedMapName.value : true
            return matchesDate && matchesMapName
        })
    })

    function selectMap(id: number) {
        router.push(`/game-history/${id}`)
    }

    const mapNames = computed(() => {
        const names = new Set(gameHistory.maps.map(game => game.long_name))
        return Array.from(names)
    })
</script>

<style lang="scss" scoped>
    .game-history__tile {
        border-radius: 6px;
        position: relative;
        background-position: center;
        background-size: cover;
        box-shadow: 0 3px 12px rgba(var(--v-shadow-key-umbra-color), var(--v-shadow-md-opacity)), 0 0 transparent, 0 0 transparent;
        transition: all 0.5s ease;

        &:hover {
            background-size: 110%;
            cursor: pointer;
        }

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

        .time-elapsed {
            font-size: 0.7rem;
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

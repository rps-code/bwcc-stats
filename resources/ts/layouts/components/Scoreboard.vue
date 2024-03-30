<template>
    <VCard :title="title">
        <template #append v-if="!isLoading">
            <div class="d-flex me-n2">
                <div class="search-bar mr-5" style="width: 220px">
                    <v-text-field v-model="searchQuery" placeholder="Search player"></v-text-field>
                </div>
                <div v-if="showButton">
                    <IconBtn @click="fetchStats" :disabled="isRefreshButtonDisabled">
                        <VIcon size="26" icon="tabler-refresh" />
                        <v-tooltip activator="parent" location="bottom" class="text-center"
                            >Refresh Data<br /><small>(10 second cooldown)</small></v-tooltip
                        >
                    </IconBtn>
                </div>
            </div>
        </template>
        <template v-if="isLoading">
            <h3 class="text-center pb-5">Loading...</h3>
        </template>
        <VDivider v-if="!isLoading" />
        <VTable v-if="!isLoading" class="text-no-wrap scoreboard-table">
            <thead>
                <tr>
                    <th>PLAYER</th>
                    <th>COMBAT</th>
                    <th>OFFENSIVE</th>
                    <th>DEFENSIVE</th>
                    <th>SUPPORT</th>
                    <th>KILLS</th>
                    <th>DEATHS</th>
                    <th>&nbsp;</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(player, index) in filteredStats" :key="index">
                    <td :class="{ 'bwcc-member': isBwccMember(player.player) }">{{ player.player }}</td>
                    <td>{{ player.combat }}</td>
                    <td>{{ player.offense }}</td>
                    <td>{{ player.defense }}</td>
                    <td>{{ player.support }}</td>
                    <td style="color: #28c76f">{{ player.kills }}</td>
                    <td style="color: #ff4c51">{{ player.deaths }}</td>
                    <td align="right">
                        <IconBtn @click="openPlayerDetails(player)">
                            <VIcon size="24" icon="tabler-dots-vertical" />
                        </IconBtn>
                    </td>
                </tr>
            </tbody>
        </VTable>
    </VCard>

    <v-dialog v-model="playerDetailsOpen" class="player-details" width="auto" @click:outside="closePlayerDetails()">
        <v-card max-width="800" prepend-icon="tabler-user" v-if="playerDetails">
            <template v-slot:title>
                <p class="mb-0">
                    <span :class="{ 'bwcc-member': isBwccMember(playerDetails.player) }">{{ playerDetails.player }}</span
                    >'s Statistics
                </p>
            </template>
            <template v-slot:text>
                <div class="d-flex flex-wrap">
                    <div class="d-flex w-25">
                        <div>
                            <h5 class="text-h5">Combat</h5>
                            <p class="mb-0">{{ playerDetails.combat }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25">
                        <div>
                            <h5 class="text-h5">Offense</h5>
                            <p class="mb-0">{{ playerDetails.offense }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25">
                        <div>
                            <h5 class="text-h5">Defense</h5>
                            <p class="mb-0">{{ playerDetails.defense }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25">
                        <div>
                            <h5 class="text-h5">Support</h5>
                            <p class="mb-0">{{ playerDetails.support }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25 mt-5">
                        <div>
                            <h5 class="text-h5">Kills</h5>
                            <p class="mb-0">{{ playerDetails.kills }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25 mt-5">
                        <div>
                            <h5 class="text-h5">Deaths</h5>
                            <p class="mb-0">{{ playerDetails.deaths }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25 mt-5">
                        <div>
                            <h5 class="text-h5">Teamkills</h5>
                            <p class="mb-0">{{ playerDetails.teamkills }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25 mt-5">
                        <div>
                            <h5 class="text-h5">Kills Per Min</h5>
                            <p class="mb-0">{{ playerDetails.kills_per_minute }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25 mt-5">
                        <div>
                            <h5 class="text-h5">KDR</h5>
                            <p class="mb-0" v-if="playerDetails.kill_death_ratio < 0.5" style="color: #ff4c51">
                                {{ playerDetails.kill_death_ratio }}
                            </p>
                            <p
                                class="mb-0"
                                v-else-if="playerDetails.kill_death_ratio >= 0.5 && playerDetails.kill_death_ratio < 1"
                                style="color: #ff9f43"
                            >
                                {{ playerDetails.kill_death_ratio }}
                            </p>
                            <p class="mb-0" v-else style="color: #28c76f">{{ playerDetails.kill_death_ratio }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25 mt-5">
                        <div>
                            <h5 class="text-h5">Top Kill Streak</h5>
                            <p class="mb-0">{{ playerDetails.kills_streak }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25 mt-5">
                        <div>
                            <h5 class="text-h5">Top Death Streak</h5>
                            <p class="mb-0">{{ playerDetails.deaths_without_kill_streak }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25 mt-5">
                        <div>
                            <h5 class="text-h5">Deaths Per Min</h5>
                            <p class="mb-0">{{ playerDetails.deaths_per_minute }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25 mt-5">
                        <div>
                            <h5 class="text-h5">Deaths By TK</h5>
                            <p class="mb-0">{{ playerDetails.deaths_by_tk }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25 mt-5">
                        <div>
                            <h5 class="text-h5">Longest Life</h5>
                            <p class="mb-0">{{ prettyTime(playerDetails.longest_life_secs) }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25 mt-5">
                        <div>
                            <h5 class="text-h5">Shortest Life</h5>
                            <p class="mb-0">{{ prettyTime(playerDetails.shortest_life_secs) }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-25 mt-5">
                        <div>
                            <h5 class="text-h5">Time Playing</h5>
                            <p class="mb-0">{{ prettyTime(playerDetails.time_seconds) }}</p>
                        </div>
                    </div>
                    <div class="d-flex w-50 mt-5" v-if="playerDetails && Object.keys(playerDetails.death_by_weapons).length > 0">
                        <div>
                            <h5 class="text-h5">Killed By (Weapon)</h5>
                            <div>
                                <p v-for="(times, weapon) in playerDetails.death_by_weapons" :key="weapon" class="mb-0">
                                    -&nbsp;{{ weapon }}: <strong>{{ times }}</strong> deaths
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex w-50 mt-5" v-if="playerDetails && Object.keys(playerDetails.weapons).length > 0">
                        <div>
                            <h5 class="text-h5">Kills (Weapon)</h5>
                            <div>
                                <p v-for="(times, weapon) in playerDetails.weapons" :key="weapon" class="mb-0">
                                    -&nbsp;{{ weapon }}: <strong>{{ times }}</strong> kills
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="d-flex w-50 mt-5" v-if="playerDetails && Object.keys(playerDetails.death_by).length > 0">
                        <div>
                            <h5 class="text-h5">Killed By (Player)</h5>
                            <ul>
                                <li v-for="(times, player) in playerDetails.death_by" :key="player" class="mb-0">
                                    - <span :class="{ 'bwcc-member': isBwccMember(player.toString()) }">{{ player }}</span
                                    >: <strong>{{ times }}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="d-flex w-50 mt-5" v-if="playerDetails && Object.keys(playerDetails.most_killed).length > 0">
                        <div>
                            <h5 class="text-h5">Kills (Player)</h5>
                            <ul>
                                <li v-for="(times, player) in playerDetails.most_killed" :key="player" class="mb-0">
                                    - <span :class="{ 'bwcc-member': isBwccMember(player.toString()) }">{{ player }}</span
                                    >: <strong>{{ times }}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </template>
        </v-card>
    </v-dialog>
</template>

<script setup lang="ts">
    import { PlayerStats } from '@/views/types/topdogs'

    const playerDetailsOpen = ref(false)
    const playerDetails = ref<PlayerStats | null>(null)
    const searchQuery = ref('')

    const props = defineProps<{
        title: string
        isLoading: boolean
        stats: PlayerStats[]
        showButton: boolean
        fetchStats?: () => void
        isRefreshButtonDisabled?: boolean
    }>()

    const filteredStats = computed(() => {
        return props.stats.filter(player => player.player.toLowerCase().includes(searchQuery.value.toLowerCase()))
    })

    function openPlayerDetails(player: PlayerStats) {
        playerDetailsOpen.value = true
        playerDetails.value = player
    }

    function closePlayerDetails() {
        playerDetailsOpen.value = false
    }
</script>

<style lang="scss" scoped>
    .scoreboard-table {
        td {
            padding-block: 1rem;
        }
    }

    .player-details {
        ul {
            list-style-type: none;
            columns: 2;
            padding-right: 0.6rem;
        }
    }
</style>

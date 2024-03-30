<template>
    <VRow>
        <VCol cols="2">
            <VCard>
                <VCardText>
                    <VAvatar color="primary" variant="tonal" rounded size="44">
                        <VIcon icon="tabler-skull" size="28" />
                    </VAvatar>

                    <h5 class="text-h5 mt-3">Total Kills</h5>
                    <p class="mb-3">{{ totalKills }}</p>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="2">
            <VCard>
                <VCardText>
                    <VAvatar color="primary" variant="tonal" rounded size="44">
                        <VIcon icon="tabler-thumb-down" size="28" />
                    </VAvatar>

                    <h5 class="text-h5 mt-3">Most Deaths</h5>
                    <p class="mb-3" :class="{ 'bwcc-member': isBwccMember(computeStats.mostKilled.name) }">
                        {{ computeStats.mostKilled.name }}
                    </p>
                    <VChip color="error" label size="small"> {{ computeStats.mostKilled.deaths }} deaths </VChip>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="2">
            <VCard>
                <VCardText>
                    <VAvatar color="primary" variant="tonal" rounded size="44">
                        <VIcon icon="tabler-thumb-up" size="28" />
                    </VAvatar>

                    <h5 class="text-h5 mt-3">Top Killer</h5>
                    <p class="mb-3" :class="{ 'bwcc-member': isBwccMember(computeStats.topKiller.name) }">
                        {{ computeStats.topKiller.name }}
                    </p>
                    <VChip color="success" label size="small"> {{ computeStats.topKiller.kills }} kills </VChip>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="2">
            <VCard>
                <VCardText>
                    <VAvatar color="primary" variant="tonal" rounded size="44">
                        <VIcon icon="tabler-caret-up" size="28" />
                    </VAvatar>

                    <h5 class="text-h5 mt-3">Top Kills/m</h5>
                    <p class="mb-3" :class="{ 'bwcc-member': isBwccMember(computeStats.mostKillsPerMin.name) }">
                        {{ computeStats.mostKillsPerMin.name }}
                    </p>
                    <VChip color="success" label size="small"> {{ computeStats.mostKillsPerMin.killsPerMin }} kills per min </VChip>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="2">
            <VCard>
                <VCardText>
                    <VAvatar color="primary" variant="tonal" rounded size="44">
                        <VIcon icon="tabler-caret-down" size="28" />
                    </VAvatar>

                    <h5 class="text-h5 mt-3">Most Deaths/m</h5>
                    <p class="mb-3" :class="{ 'bwcc-member': isBwccMember(computeStats.mostDeathsPerMin.name) }">
                        {{ computeStats.mostDeathsPerMin.name }}
                    </p>
                    <VChip color="error" label size="small"> {{ computeStats.mostDeathsPerMin.deathsPerMin }} deaths per min </VChip>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="2">
            <VCard>
                <VCardText>
                    <VAvatar color="primary" variant="tonal" rounded size="44">
                        <VIcon icon="tabler-star" size="28" />
                    </VAvatar>

                    <h5 class="text-h5 mt-3">Highest KDR</h5>
                    <p class="mb-3" :class="{ 'bwcc-member': isBwccMember(computeStats.highestKDR.name) }">
                        {{ computeStats.highestKDR.name }}
                    </p>
                    <VChip color="success" label size="small"> {{ computeStats.highestKDR.kdr }} </VChip>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="2">
            <VCard>
                <VCardText>
                    <VAvatar color="primary" variant="tonal" rounded size="44">
                        <VIcon icon="tabler-trophy" size="28" />
                    </VAvatar>

                    <h5 class="text-h5 mt-3">Top Kill Streak</h5>
                    <p class="mb-3" :class="{ 'bwcc-member': isBwccMember(computeStats.topKillStreak.name) }">
                        {{ computeStats.topKillStreak.name }}
                    </p>
                    <VChip color="success" label size="small"> {{ computeStats.topKillStreak.killStreak }} kills </VChip>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="2">
            <VCard>
                <VCardText>
                    <VAvatar color="primary" variant="tonal" rounded size="44">
                        <VIcon icon="tabler-poo" size="28" />
                    </VAvatar>

                    <h5 class="text-h5 mt-3">Top Death Streak</h5>
                    <p class="mb-3" :class="{ 'bwcc-member': isBwccMember(computeStats.topDeathStreak.name) }">
                        {{ computeStats.topDeathStreak.name }}
                    </p>
                    <VChip color="error" label size="small"> {{ computeStats.topDeathStreak.deathStreak }} deaths </VChip>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="2">
            <VCard>
                <VCardText>
                    <VAvatar color="primary" variant="tonal" rounded size="44">
                        <VIcon icon="tabler-prison" size="28" />
                    </VAvatar>

                    <h5 class="text-h5 mt-3">Most Teamkills</h5>
                    <p class="mb-3" :class="{ 'bwcc-member': isBwccMember(computeStats.mostTeamKills.name) }">
                        {{ computeStats.mostTeamKills.name }}
                    </p>
                    <VChip color="error" label size="small"> {{ computeStats.mostTeamKills.teamKills }} teamkills </VChip>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="2">
            <VCard>
                <VCardText>
                    <VAvatar color="primary" variant="tonal" rounded size="44">
                        <VIcon icon="tabler-heartbeat" size="28" />
                    </VAvatar>

                    <h5 class="text-h5 mt-3">Longest Life</h5>
                    <p class="mb-3" :class="{ 'bwcc-member': isBwccMember(computeStats.longestLife.name) }">
                        {{ computeStats.longestLife.name }}
                    </p>
                    <VChip color="success" label size="small"> {{ prettyTime(computeStats.longestLife.longestLifeSecs) }} </VChip>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="2">
            <VCard>
                <VCardText>
                    <VAvatar color="primary" variant="tonal" rounded size="44">
                        <VIcon icon="tabler-heart-off" size="28" />
                    </VAvatar>

                    <h5 class="text-h5 mt-3">Shortest Life</h5>
                    <p class="mb-3" :class="{ 'bwcc-member': isBwccMember(computeStats.shortestLife.name) }">
                        {{ computeStats.shortestLife.name }}
                    </p>
                    <VChip color="error" label size="small"> {{ prettyTime(computeStats.shortestLife.shortestLifeSecs) }} </VChip>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="2">
            <VCard>
                <VCardText>
                    <VAvatar color="primary" variant="tonal" rounded size="44">
                        <VIcon icon="tabler-rosette" size="28" />
                    </VAvatar>

                    <h5 class="text-h5 mt-3">High Score</h5>
                    <p class="mb-3" :class="{ 'bwcc-member': isBwccMember(computeStats.topScore.name) }">
                        {{ computeStats.topScore.name }}
                    </p>
                    <VChip color="success" label size="small"> {{ computeStats.topScore.score }} </VChip>
                </VCardText>
            </VCard>
        </VCol>

        <VCol cols="8">
            <VCard>
                <VCardItem class="pb-4 w-50">
                    <VCardTitle>Most Lethal Weapon</VCardTitle>
                    <VCardSubtitle>The weapon with the most kills</VCardSubtitle>
                </VCardItem>

                <VCardText v-if="series.length">
                    <VueApexCharts :options="chartOptions" :series="series" height="290" />
                </VCardText>
                <VCardItem v-else>
                    <p>Nobody has killed anyone yet so this graph cannot render!</p>
                </VCardItem>
            </VCard>
        </VCol>

        <VCol cols="4">
            <VCard>
                <VCardText>
                    <h5 class="text-h5 mb-2">
                        BWCC Members In-Game
                        <VChip v-if="bwccMembers.length <= 0" class="ml-2" color="error" label size="small">
                            {{ bwccMembers.length }}
                        </VChip>
                        <VChip v-else-if="bwccMembers.length > 0 && bwccMembers.length < 5" class="ml-2" color="warning" label size="small">
                            {{ bwccMembers.length }}
                        </VChip>
                        <VChip v-else class="ml-2" color="success" label size="small"> {{ bwccMembers.length }} </VChip>
                    </h5>

                    <div class="members-list">
                        <p v-for="member in bwccMembers" class="mb-1">
                            {{ member }}
                        </p>
                    </div>
                </VCardText>
            </VCard>
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
    import { LiveStatsResponse } from '@/views/types/topdogs'
    import { isBwccMember } from '@/utils/methods'

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
        try {
            const res = await $api('/gameserver/get_live_game_stats', {
                method: 'GET',
                onResponseError: ({ response }) => console.error(response._data.errors)
            })

            Object.assign(liveStats, JSON.parse(res))
        } catch (err) {
            console.error(err)
        }
    }

    fetchLiveStats()

    const totalKills = computed(() => {
        return liveStats.stats.reduce((total, current) => total + current.kills, 0)
    })

    const computeStats = computed(() => {
        let mostKilled = { name: 'N/A', deaths: 0 }
        let maxKills = liveStats.stats[0]?.kills || 0
        let maxKiller = liveStats.stats[0]?.player || 'N/A'
        let maxKillStreak = 0,
            maxKillStreakPlayer = 'N/A'
        let maxDeathStreak = 0,
            maxDeathStreakPlayer = 'N/A'
        let maxTeamKills = 0,
            maxTeamKillsPlayer = 'N/A'
        let longestLife = 0,
            longestLifePlayer = 'N/A'
        let shortestLife = Infinity,
            shortestLifePlayer = 'N/A'
        let maxScore = 0,
            maxScorePlayer = 'N/A'
        let maxKillsPerMin = 0,
            maxKPMPlayer = 'N/A'
        let maxDeathsPerMin = 0,
            maxDPMPlayer = 'N/A'
        let maxKDR = 0,
            maxKDRPlayer = 'N/A'
        const kills = <any>{}

        liveStats.stats.forEach(stat => {
            if (stat.kills > maxKills) {
                maxKills = stat.kills
                maxKiller = stat.player
            }

            if (stat.kills_streak > maxKillStreak) {
                maxKillStreak = stat.kills_streak
                maxKillStreakPlayer = stat.player
            }

            if (stat.deaths_without_kill_streak > maxDeathStreak) {
                maxDeathStreak = stat.deaths_without_kill_streak
                maxDeathStreakPlayer = stat.player
            }

            if (stat.teamkills > maxTeamKills) {
                maxTeamKills = stat.teamkills
                maxTeamKillsPlayer = stat.player
            }

            if (stat.longest_life_secs > longestLife) {
                longestLife = stat.longest_life_secs
                longestLifePlayer = stat.player
            }

            if (stat.shortest_life_secs < shortestLife && stat.shortest_life_secs > 0) {
                shortestLife = stat.shortest_life_secs
                shortestLifePlayer = stat.player
            }

            const score = stat.combat + stat.offense + stat.defense + stat.support
            if (score > maxScore) {
                maxScore = score
                maxScorePlayer = stat.player
            }

            const kpm = stat.time_seconds > 0 ? stat.kills / (stat.time_seconds / 60) : 0
            if (kpm > maxKillsPerMin) {
                maxKillsPerMin = kpm
                maxKPMPlayer = stat.player
            }

            const dpm = stat.time_seconds > 0 ? stat.deaths / (stat.time_seconds / 60) : 0
            if (dpm > maxDeathsPerMin) {
                maxDeathsPerMin = dpm
                maxDPMPlayer = stat.player
            }

            const kdr = stat.deaths > 0 ? stat.kills / stat.deaths : stat.kills
            if (kdr > maxKDR) {
                maxKDR = kdr
                maxKDRPlayer = stat.player
            }

            Object.entries(stat.weapons).forEach(([weapon, count]) => {
                kills[weapon] = (kills[weapon] || 0) + count
            })
        })

        liveStats.stats.forEach(stat => {
            Object.entries(stat.most_killed).forEach(([name, deaths]) => {
                if (deaths > mostKilled.deaths) {
                    mostKilled = { name, deaths }
                }
            })
        })

        return {
            mostKilled,
            topKiller: { name: maxKiller, kills: maxKills },
            topKillStreak: { name: maxKillStreakPlayer, killStreak: maxKillStreak },
            topDeathStreak: { name: maxDeathStreakPlayer, deathStreak: maxDeathStreak },
            mostTeamKills: { name: maxTeamKillsPlayer, teamKills: maxTeamKills },
            longestLife: { name: longestLifePlayer, longestLifeSecs: longestLife },
            shortestLife: { name: shortestLifePlayer, shortestLifeSecs: shortestLife },
            topScore: { name: maxScorePlayer, score: maxScore },
            mostKillsPerMin: { name: maxKPMPlayer, killsPerMin: maxKillsPerMin.toFixed(2) },
            mostDeathsPerMin: { name: maxDPMPlayer, deathsPerMin: maxDeathsPerMin.toFixed(2) },
            highestKDR: { name: maxKDRPlayer, kdr: maxKDR.toFixed(2) },
            weaponKills: kills
        }
    })

    const series = computed(() => {
        return Object.values(computeStats.value.weaponKills)
    })

    const chartOptions = computed(() => {
        return {
            chart: {
                type: 'pie',
                toolbar: {
                    show: false
                }
            },
            plotOptions: {
                pie: {
                    expandOnClick: false
                }
            },
            states: {
                active: {
                    filter: {
                        type: 'none'
                    }
                }
            },
            stroke: {
                colors: ['black'],
                width: 0.1
            },
            labels: Object.keys(computeStats.value.weaponKills),
            colors: [
                '#1c1d32',
                '#1f2037',
                '#22233c',
                '#252641',
                '#272946',
                '#2a2c4b',
                '#2d2f50',
                '#303255',
                '#33355a',
                '#36385f',
                '#393b64',
                '#3b3d69',
                '#3e406e',
                '#414372',
                '#444678',
                '#47497d',
                '#4a4c82',
                '#4c4f87',
                '#4f528c',
                '#525591',
                '#555896',
                '#585b9b',
                '#5b5ea0',
                '#5e61a5',
                '#6064aa',
                '#6367af',
                '#666ab4',
                '#696db9',
                '#6c70be',
                '#6f73c3'
            ],
            tooltip: {
                y: {
                    formatter: function (value: number) {
                        return `${value} Kills`
                    }
                }
            },
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ]
        }
    })

    const bwccMembers = computed(() => {
        return liveStats.stats.filter(player => player.player.startsWith('[BWCC]')).map(player => player.player)
    })
</script>

<style lang="scss" scoped>
    :deep(.apexcharts-legend) {
        top: -70px !important;
    }

    .v-theme--dark :deep(.apexcharts-legend-text) {
        color: white !important;
    }

    .vue-apexcharts :deep(svg),
    .vue-apexcharts :deep(foreignObject) {
        overflow: visible;
    }
</style>

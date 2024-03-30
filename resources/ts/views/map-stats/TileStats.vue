<template>
    <VCol cols="3">
        <VCard>
            <VCardText>
                <VAvatar color="primary" variant="tonal" rounded size="44">
                    <VIcon icon="tabler-clock" size="28" />
                </VAvatar>

                <h5 class="text-h5 mt-3">Average Game Length</h5>
                <p v-if="isLoading" class="mb-3">Loading...</p>
                <p v-else class="mb-3">
                    {{ prettyTime(avgLength) }}
                </p>
            </VCardText>
        </VCard>
    </VCol>

    <VCol cols="3">
        <VCard>
            <VCardText>
                <VAvatar color="primary" variant="tonal" rounded size="44">
                    <VIcon icon="tabler-map" size="28" />
                </VAvatar>

                <h5 class="text-h5 mt-3">Total Matches</h5>
                <p v-if="isLoading" class="mb-3">Loading...</p>
                <p v-else class="mb-3">
                    {{ totalGames }}
                </p>
            </VCardText>
        </VCard>
    </VCol>

    <VCol cols="3">
        <VCard>
            <VCardText>
                <VAvatar color="primary" variant="tonal" rounded size="44">
                    <VIcon icon="tabler-star" size="28" />
                </VAvatar>

                <h5 class="text-h5 mt-3">Most Popular Map</h5>
                <p v-if="isLoading" class="mb-3">Loading...</p>
                <p v-else class="mb-3">
                    {{ formatMapName(mostPopularMap) }}
                </p>
            </VCardText>
        </VCard>
    </VCol>

    <VCol cols="3">
        <VCard>
            <VCardText>
                <VAvatar color="primary" variant="tonal" rounded size="44">
                    <VIcon icon="tabler-poo" size="28" />
                </VAvatar>

                <h5 class="text-h5 mt-3">Least Popular Map</h5>
                <p v-if="isLoading" class="mb-3">Loading...</p>
                <p v-else class="mb-3">
                    {{ formatMapName(leastPopularMap) }}
                </p>
            </VCardText>
        </VCard>
    </VCol>
</template>

<script lang="ts" setup>
    import { MapStatsResponse } from '@/views/types/mapstats'

    const props = defineProps<{
        stats: MapStatsResponse
        isLoading: boolean
    }>()

    const avgLength = computed(() => {
        const validGames = props.stats.filter(game => game.end !== null)
        const totalLength = validGames.reduce((acc, game) => acc + ((game.end as number) - game.start), 0)
        return validGames.length > 0 ? totalLength / validGames.length : 0
    })

    const totalGames = computed(() => {
        return props.stats.length
    })

    const mostPopularMap = computed(() => {
        const mapCounts = props.stats.reduce((acc, { name }) => {
            acc[name] = (acc[name] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        let mostPopular = { name: '', count: 0 }
        for (const [name, count] of Object.entries(mapCounts)) {
            if (count > mostPopular.count) mostPopular = { name, count }
        }

        return mostPopular.name
    })

    const leastPopularMap = computed(() => {
        const mapCounts = props.stats.reduce((acc, { name }) => {
            acc[name] = (acc[name] || 0) + 1
            return acc
        }, {} as Record<string, number>)

        let leastPopular = { name: '', count: Infinity }
        for (const [name, count] of Object.entries(mapCounts)) {
            if (count < leastPopular.count && count > 0) leastPopular = { name, count }
        }

        if (leastPopular.count === Infinity) return 'All maps equally popular'

        return leastPopular.name
    })
</script>

<template>
    <div>
        <VCard title="VIP Checker">
            <template #append>
                <div class="d-flex me-n2">
                    <div class="search-bar mr-5 d-flex" style="width: 340px">
                        <v-text-field v-model="player" placeholder="Player Name"></v-text-field>
                        <v-btn @click="viewPlayerInfo" class="ml-4">Search</v-btn>
                    </div>
                </div>
            </template>
            <template v-if="isLoading">
                <h3 class="text-center pb-5">Loading...</h3>
            </template>
            <template v-if="!isLoading && initialLoad">
                <h3 class="text-center pb-10">Please search via the player name input above</h3>
            </template>
            <VDivider v-if="!isLoading && !initialLoad" />
            <VTable v-if="!isLoading && !initialLoad" class="text-no-wrap scoreboard-table">
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>VIP</th>
                        <th>EXPIRES</th>
                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(player, index) in playerInfo.players" :key="index">
                        <td :class="{ 'bwcc-member': isBwccMember(player.names_by_match[0]) }">{{ player.names_by_match[0] }}</td>
                        <td :class="{ 'red-text': !hasVIP(player.vip_expiration), 'green-text': hasVIP(player.vip_expiration) }">
                            {{ hasVIP(player.vip_expiration) ? 'YES' : 'NO' }}
                        </td>
                        <td>{{ getExpiration(player.vip_expiration) }}</td>
                    </tr>
                </tbody>
            </VTable>
        </VCard>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue'
    import { PlayerInfoResponse } from '@/views/types/vipchecker'

    const player = ref('')
    const isLoading = ref(false)
    const initialLoad = ref(true)
    const playerInfo = reactive<PlayerInfoResponse>({
        total: 0,
        players: []
    })

    const fetchVIP = async (player: string) => {
        isLoading.value = true
        try {
            const res = await $api('/gameserver/players_history', {
                method: 'GET',
                params: { player },
                onResponseError: ({ response }) => console.error(response._data.errors)
            })
            Object.assign(playerInfo, JSON.parse(res))
        } catch (err) {
            console.error(err)
        } finally {
            isLoading.value = false
            initialLoad.value = false
        }
    }

    const viewPlayerInfo = () => {
        fetchVIP(player.value)
    }

    function hasVIP(vip_expiration: null | string) {
        return vip_expiration == null || vip_expiration == '' || vip_expiration == undefined ? false : true
    }

    function getExpiration(vip_expiration: null | string) {
        if (vip_expiration == null || vip_expiration == '' || vip_expiration == undefined) return 'N/A'

        const date = getDate(vip_expiration)
        const time = getTime(vip_expiration)

        if (date == '3000-01-01' && time == '00:00') return 'Never'

        return `${date} ${time}`
    }
</script>

<style lang="scss">
    .red-text {
        color: #ff4c51;
    }

    .green-text {
        color: #28c76f;
    }
</style>

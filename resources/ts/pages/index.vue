<template>
    <VRow class="match-height">
        <VCol cols="12">
            <GameState />
        </VCol>

        <VCol cols="12">
            <TopDogs />
        </VCol>
    </VRow>
</template>

<script setup lang="ts">
    import GameState from '@/views/live-game-info/GameState.vue'
    import TopDogs from '@/views/live-game-info/TopDogs.vue'
</script>

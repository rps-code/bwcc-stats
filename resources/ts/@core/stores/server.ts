const state = reactive({
    isServerOne: JSON.parse(localStorage.getItem('bwccstats-is-server-one') || 'true')
})

const methods = {
    toggleServer() {
        state.isServerOne = !state.isServerOne
    },
    setIsServerOne(value: boolean) {
        state.isServerOne = value
    }
}

watch(
    () => state.isServerOne,
    newValue => {
        localStorage.setItem('bwccstats-is-server-one', JSON.stringify(newValue))
        location.reload()
    }
)

export default {
    state: readonly(state),
    methods
}

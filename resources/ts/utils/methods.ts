export function isBwccMember(name: string) {
    return name.startsWith('[BWCC]') ? true : false
}

export function getTimeElapsed(start: string, end: string): string {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const diff = endDate.getTime() - startDate.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff / (1000 * 60)) % 60)
    const seconds = Math.floor((diff / 1000) % 60)

    const formatted = [hours.toString().padStart(2, '0'), minutes.toString().padStart(2, '0'), seconds.toString().padStart(2, '0')].join(
        ':'
    )

    return formatted
}

export function getDate(input: string): string {
    return input.split('T')[0]
}

export function getTime(input: string): string {
    const timePart = input.split('T')[1]
    return timePart.split(':').slice(0, 2).join(':')
}

export function getBackground(map: string) {
    return { backgroundImage: `url('/images/maps/${map.split('_')[0]}.jpg')` }
}

export function formatMapName(map: string) {
    const words = map.replace(/_/g, ' ').split(' ')
    return words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

export function prettyTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const remainingSeconds = Math.round(seconds % 60)
    let result = ''

    if (hours > 0) {
        result += `${hours}h `
    }
    if (minutes > 0) {
        result += `${minutes}m `
    }
    if (remainingSeconds > 0 || result === '') {
        result += `${remainingSeconds}s`
    }
    return result.trim()
}

export type Maps = {
    just_name: string
    long_name: string
    id: number
    creation_time: string
    start: string
    end: string
    server_number: number
    map_name: string
    player_stats: []
}

export type GameHistoryResponse = {
    page: number
    page_size: number
    total: number
    maps: Maps[]
}

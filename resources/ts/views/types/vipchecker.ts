export type Player = {
    id: number
    steam_id_64: string
    created: string
    names: PlayerName[]
    sessions: any[]
    sessions_count: number
    total_playtime_seconds: number
    current_playtime_seconds: number
    received_actions: any[]
    penalty_count: PenaltyCount
    blacklist: any
    flags: any[]
    watchlist: any
    steaminfo: any
    vips: VIP[]
    names_by_match: string[]
    first_seen_timestamp_ms: number
    last_seen_timestamp_ms: number
    vip_expiration: string | null
}

export type PlayerName = {
    id: number
    name: string
    steam_id_64: string
    created: string
    last_seen: string
}

export type PenaltyCount = {
    KICK: number
    PUNISH: number
    TEMPBAN: number
    PERMABAN: number
}

export type VIP = {
    server_number: number
    expiration: string
}

export type PlayerInfoResponse = {
    total: number
    players: Player[]
}

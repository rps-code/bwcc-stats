export interface DeathByWeapons {
    [weapon: string]: number
}

export interface Weapons {
    [weapon: string]: number
}

export interface DeathBy {
    [player: string]: number
}

export interface MostKilled {
    [player: string]: number
}

export interface PlayerStats {
    id?: number
    player: string
    steam_id_64: string
    steaminfo: null | any
    kills: number
    kills_streak: number
    deaths: number
    death_by_weapons: DeathByWeapons
    deaths_without_kill_streak: number
    teamkills: number
    teamkills_streak: number
    deaths_by_tk: number
    deaths_by_tk_streak: number
    nb_vote_started: number
    nb_voted_yes: number
    nb_voted_no: number
    longest_life_secs: number
    shortest_life_secs: number
    last_spawn?: string
    time_seconds: number
    weapons: Weapons
    death_by: DeathBy
    most_killed: MostKilled
    combat: number
    offense: number
    defense: number
    support: number
    kills_per_minute: number
    deaths_per_minute: number
    kill_death_ratio: number
}

export interface LiveStatsResponse {
    snapshot_timestamp: number
    stats: PlayerStats[]
}

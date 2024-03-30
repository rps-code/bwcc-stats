export interface Game {
    id: number
    creation_time: string
    start: string
    end: string
    server_number: number
    map_name: string
    player_stats: PlayerStat[]
}

export interface PlayerStat {
    id?: number
    last_spawn?: string
    player_id?: number
    steam_id_64: string
    player: string
    steaminfo: null | string
    map_id?: number
    kills: number
    kills_streak: number
    deaths: number
    deaths_without_kill_streak: number
    teamkills: number
    teamkills_streak: number
    deaths_by_tk: number
    deaths_by_tk_streak: number
    nb_vote_started: number
    nb_voted_yes: number
    nb_voted_no: number
    time_seconds: number
    kills_per_minute: number
    deaths_per_minute: number
    kill_death_ratio: number
    longest_life_secs: number
    shortest_life_secs: number
    combat: number
    offense: number
    defense: number
    support: number
    most_killed: Record<string, number>
    death_by: Record<string, number>
    weapons: Record<string, number>
    death_by_weapons: Record<string, number>
}

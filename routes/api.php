<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\GameServer;

Route::group(['prefix' => 'gameserver'], function () {
    Route::get('get_gamestate', [GameServer::class, 'get_gamestate']);
    Route::get('get_live_game_stats', [GameServer::class, 'get_live_game_stats']);
    Route::get('get_scoreboard_maps', [GameServer::class, 'get_scoreboard_maps']);
    Route::get('get_map_scoreboard', [GameServer::class, 'get_map_scoreboard']);
    Route::get('get_map_history', [GameServer::class, 'get_map_history']);
    Route::get('players_history', [GameServer::class, 'players_history']);
});



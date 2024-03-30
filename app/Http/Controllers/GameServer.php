<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GameServer {
    const SERVER_ONE_URL = 'https://admin1.bwcc-clan.com/api/';
    const SERVER_ONE_TOKEN = '55af6dea-a599-4a21-801f-956134c9b767';
    const SERVER_TWO_URL = 'https://admin2.bwcc-clan.com/api/';
    const SERVER_TWO_TOKEN = '2ae7bbe4-3106-4cb4-a3dd-7376a53ae68d';

    protected function makeConditionalReq($isServerOne, $endpoint, $isPost = false) {
        $isServerOne = filter_var($isServerOne, FILTER_VALIDATE_BOOLEAN);
        
        $url = $isServerOne ? self::SERVER_ONE_URL : self::SERVER_TWO_URL;
        $token = $isServerOne ? self::SERVER_ONE_TOKEN : self::SERVER_TWO_TOKEN;
        $response = $isPost 
        ? Http::withToken($token)->post($url . $endpoint) 
        : Http::withToken($token)->get($url . $endpoint);

        $data = json_decode($response->body(), true);
        return json_encode($data['result']);
    }

    public function get_gamestate(Request $request) {
        $isServerOne = $request->header('Is-Server-One');
        return $this->makeConditionalReq($isServerOne, 'get_gamestate');
    }

    public function get_scoreboard_maps(Request $request) {
        $isServerOne = $request->header('Is-Server-One');
        $page = $request->query('page', 1);
        $limit = $request->query('limit', 10);
        return $this->makeConditionalReq($isServerOne, 'get_scoreboard_maps?limit=' . $limit . '&page=' . $page);
    }

    public function get_map_scoreboard(Request $request) {
        $isServerOne = $request->header('Is-Server-One');
        $map_id = $request->query('gameId', 1);
        return $this->makeConditionalReq($isServerOne, 'get_map_scoreboard?map_id=' . $map_id);
    }

    public function get_live_game_stats(Request $request) {
        $isServerOne = $request->header('Is-Server-One');
        return $this->makeConditionalReq($isServerOne, 'get_live_game_stats');
    }

    public function get_map_history(Request $request) {
        $isServerOne = $request->header('Is-Server-One');
        $response = $this->makeConditionalReq($isServerOne, 'get_map_history');
        $data = json_decode($response, true);
        foreach ($data as &$item) {
            unset($item['player_stats']);
        }
        return json_encode($data);
    }

    public function players_history(Request $request) {
        $isServerOne = filter_var($request->header('Is-Server-One'), FILTER_VALIDATE_BOOLEAN);
        $player = $request->query('player', '[BWCC] rps');
        
        $url = $isServerOne ? self::SERVER_ONE_URL : self::SERVER_TWO_URL;
        $token = $isServerOne ? self::SERVER_ONE_TOKEN : self::SERVER_TWO_TOKEN;
    
        $response = Http::withToken($token)->post($url . 'players_history', ['player_name' => $player]);
        $data = json_decode($response->body(), true);
        return json_encode($data['result']);
    }
    
}

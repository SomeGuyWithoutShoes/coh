Project = {}
Project.map = {
    width = 64,
    height = 64,
    tileSize = 128,
}
Project.game = {
    state = {
        clock = CreateTimer()
    },
    ttl = 1000
}
Project.effects = {
    clock = {
        interval = 0.03,
        recurring = true,
        callback = function()
            local effects = Project.effects
            local game = Project.game
            local timeElapsed = os.clock() - (effects.clock.lastTick or 0)
            for k, v in pairs(effects.buffer) do
                local effect = v
                if effect then
                    if effect.life > 0 then
                        effect.life = effect.life - timeElapsed
                        if effect.onUpdate then effect.onUpdate(effect) end
                    elseif effect.life > -game.ttl then
                        DestroyEffect(effect.sfx)
                        table.remove(effects.buffer, k)
                        if effect.onDestroy then effect.onDestroy(effect) end
                    end
                end
            end
            effects.clock.lastTick = os.clock()
        end
    },
    buffer = {},
    create = function(params)
        local game = Project.game
        local effects = Project.effects
        local effect = {
            touched = 0,
            life = params.life or -game.ttl,
            sfx = AddSpecialEffect(params.model, params.x, params.y),
            onDestroy = params.onDestroy,
            onUpdate = params.onUpdate,
            onCreate = params.onCreate,
            index = #effects.buffer + 1
        }
        table.insert(effects.buffer, effect)
        if effect.onCreate then effect.onCreate(effect) end
        return effect
    end
}
Project.bootload = {Project.effects}

-- Start the game state.
TimerStart(Project.game.state.clock, 0, false, function()
    local game = Project.game
    local terrain = Project.terrain
    local map = Project.map
    local effects = Project.effects
    
--  Register players.
    game.players = {}
    for i = 0, 23 do
        local player = Player(i)
        if GetPlayerSlotState(player) ~= PLAYER_SLOT_STATE_EMPTY then
            game.players[#game.players] = {player = player}
        else
            RemovePlayer(player, PLAYER_GAME_RESULT_NEUTRAL)
        end
    end
    
--  Adjust visibility.
    for k, v in pairs(game.players) do
        local fm = CreateFogModifierRect(v.player, FOG_OF_WAR_VISIBLE, bj_mapInitialPlayableArea, false, false)
        FogModifierStart(fm)
        v.fog = fm
    end
    
--  Register tiles.
    map.top = map.width * map.tileSize
    map.bottom = math.floor(-map.top / 2)
    map.right = map.height * map.tileSize
    map.left = math.floor(-map.right / 2)
    game.tiles = {}
    for i = 0, map.width * map.height do
        local x = math.fmod(i, map.width)
        local y = math.floor(i / map.height)
        local tx = map.left + x * map.tileSize
        local ty = map.bottom + y * map.tileSize
        local l = Location(tx, ty)
        local z = GetLocationZ(l)
        local t = GetTerrainType(tx, ty)
        effects.create {
            model = [[Abilities\Spells\Orc\Ensnare\EnsnareMissile.mdl]],
            x = tx,
            y = ty,
            life = math.random(1, 60),
            onDestroy = function(effect)
                effects.create {
                    model = [[Objects\Spawnmodels\Undead\UndeadLargeDeathExplode\UndeadLargeDeathExplode.mdl]],
                    x = tx,
                    y = ty,
                    life = 1
                }
            end
        }
        RemoveLocation(l)
        game.tiles[i] = {x = x, y = y, z = z, tile = t}
    end
    
--  Initialize module clocks.
    for k, v in pairs(Project.bootload) do
        local clock = v.clock
        clock.timer = CreateTimer()
        TimerStart(clock.timer, clock.interval, clock.recurring, clock.callback)
    end
    
--  Start the game clock.
    game.clock = CreateTimer()
    TimerStart(game.clock, 0.03, true, function()
        game.lastTick = os.clock()
    end)
end)

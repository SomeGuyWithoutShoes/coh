function OnModPreInit() end
function OnModInit() end
function OnModPostInit() end
function OnPlayerSpawned(player)
    print("[Zoomies]", "Player spawned.")
    EntityAddComponent(player, "LuaComponent", {
        execute_times = "1",
        execute_every_n_frame = "-1",
        execute_on_added = "1",
        enable_coroutines = "1",
        script_source_file = "files/zoomies.lua"
    })
    print("[Zoomies]", "Attached component.")
end

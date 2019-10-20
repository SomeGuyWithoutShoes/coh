dofile "data/scripts/lib/coroutines.lua"
dofile "data/scripts/lib/utilities.lua"

local zoomies = {}

print("[Zoomies]", "Invoking constructor ...")
local success, result = pcall(function() return loadfile("files/constructor.lua")() end)
if success then
    zoomies = result
    print("[Zoomies]", "Invoked successfully.")
else
    print("[Zoomies]", "Failed to invoke:\n".. tostring(result))
end

async_loop(function()
    xpcall(function()
        local ffi = zoomies.ffi
        local sdl = zoomies.sdl
        local game = zoomies.game
        local state = sdl.GetKeyboardState(nil)
        
        if state[sdl.SCANCODE_KP_PLUS] ~= 0 then
            GamePrint("E N H A N C E !")
            
            sdl.RenderSetViewport(game.renderer, ffi.new("SDL_Rect", 0, 0, 50, 50))
        elseif state[sdl.SCANCODE_KP_MINUS] ~= 0 then
            GamePrint("Zooming out :(")
            
            sdl.MinimizeWindow(game.window)
        end
    end, function(err)
        print("[Zoomies]", "Encountered an error:\n".. err)
    end)
    
    wait(1)
end)

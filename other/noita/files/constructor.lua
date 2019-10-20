local Zoomies = {libs = {}}
print("[Zoomies]", "Constructing.")
Zoomies.libs = {
    {"ffi", function()
        local ffi = require "ffi"
        ffi.cdef [[
            typedef struct SDL_Window SDL_Window;
            SDL_Window* SDL_GL_GetCurrentWindow (void);
            void SDL_MaximizeWindow (SDL_Window *window);
            void SDL_MinimizeWindow (SDL_Window *window);
            
            typedef struct SDL_Renderer SDL_Renderer;
            typedef struct SDL_Rect
            {
                int x, y;
                int w, h;
            } SDL_Rect;
            SDL_Renderer* SDL_GetRenderer(SDL_Window * window);
            int SDL_RenderClear (SDL_Renderer* renderer);
            int SDL_RenderSetLogicalSize (SDL_Renderer* renderer, int w, int h);
            int SDL_RenderSetViewport (SDL_Renderer* renderer, const SDL_Rect* rect);
            
            const uint8_t* SDL_GetKeyboardState (int* numkeys);
            void SDL_PumpEvents (void);
        ]]
        return ffi
    end},
    {"sdl", function()
        local ffi = Zoomies.ffi
        local sdl = {
            dll = ffi.load "SDL2.dll",
            scancodes = {
                ["SDL_SCANCODE_UNKNOWN"] = 0x000,
                ["SDL_SCANCODE_A"] = 0x004,
                ["SDL_SCANCODE_B"] = 0x005,
                ["SDL_SCANCODE_C"] = 0x006,
                ["SDL_SCANCODE_D"] = 0x007,
                ["SDL_SCANCODE_E"] = 0x008,
                ["SDL_SCANCODE_F"] = 0x009,
                ["SDL_SCANCODE_G"] = 0x00A,
                ["SDL_SCANCODE_H"] = 0x00B,
                ["SDL_SCANCODE_I"] = 0x00C,
                ["SDL_SCANCODE_J"] = 0x00D,
                ["SDL_SCANCODE_K"] = 0x00E,
                ["SDL_SCANCODE_L"] = 0x00F,
                ["SDL_SCANCODE_M"] = 0x010,
                ["SDL_SCANCODE_N"] = 0x011,
                ["SDL_SCANCODE_O"] = 0x012,
                ["SDL_SCANCODE_P"] = 0x013,
                ["SDL_SCANCODE_Q"] = 0x014,
                ["SDL_SCANCODE_R"] = 0x015,
                ["SDL_SCANCODE_S"] = 0x016,
                ["SDL_SCANCODE_T"] = 0x017,
                ["SDL_SCANCODE_U"] = 0x018,
                ["SDL_SCANCODE_V"] = 0x019,
                ["SDL_SCANCODE_W"] = 0x01A,
                ["SDL_SCANCODE_X"] = 0x01B,
                ["SDL_SCANCODE_Y"] = 0x01C,
                ["SDL_SCANCODE_Z"] = 0x01D,
                ["SDL_SCANCODE_1"] = 0x01E,
                ["SDL_SCANCODE_2"] = 0x01F,
                ["SDL_SCANCODE_3"] = 0x020,
                ["SDL_SCANCODE_4"] = 0x021,
                ["SDL_SCANCODE_5"] = 0x022,
                ["SDL_SCANCODE_6"] = 0x023,
                ["SDL_SCANCODE_7"] = 0x024,
                ["SDL_SCANCODE_8"] = 0x025,
                ["SDL_SCANCODE_9"] = 0x026,
                ["SDL_SCANCODE_0"] = 0x027,
                ["SDL_SCANCODE_RETURN"] = 0x028,
                ["SDL_SCANCODE_ESCAPE"] = 0x029,
                ["SDL_SCANCODE_BACKSPACE"] = 0x02A,
                ["SDL_SCANCODE_TAB"] = 0x02B,
                ["SDL_SCANCODE_SPACE"] = 0x02C,
                ["SDL_SCANCODE_MINUS"] = 0x02D,
                ["SDL_SCANCODE_EQUALS"] = 0x02E,
                ["SDL_SCANCODE_LEFTBRACKET"] = 0x02F,
                ["SDL_SCANCODE_RIGHTBRACKET"] = 0x030,
                ["SDL_SCANCODE_BACKSLASH"] = 0x031,
                ["SDL_SCANCODE_NONUSHASH"] = 0x032,
                ["SDL_SCANCODE_SEMICOLON"] = 0x033,
                ["SDL_SCANCODE_APOSTROPHE"] = 0x034,
                ["SDL_SCANCODE_GRAVE"] = 0x035,
                ["SDL_SCANCODE_COMMA"] = 0x036,
                ["SDL_SCANCODE_PERIOD"] = 0x037,
                ["SDL_SCANCODE_SLASH"] = 0x038,
                ["SDL_SCANCODE_CAPSLOCK"] = 0x039,
                ["SDL_SCANCODE_F1"] = 0x03A,
                ["SDL_SCANCODE_F2"] = 0x03B,
                ["SDL_SCANCODE_F3"] = 0x03C,
                ["SDL_SCANCODE_F4"] = 0x03D,
                ["SDL_SCANCODE_F5"] = 0x03E,
                ["SDL_SCANCODE_F6"] = 0x03F,
                ["SDL_SCANCODE_F7"] = 0x040,
                ["SDL_SCANCODE_F8"] = 0x041,
                ["SDL_SCANCODE_F9"] = 0x042,
                ["SDL_SCANCODE_F10"] = 0x043,
                ["SDL_SCANCODE_F11"] = 0x044,
                ["SDL_SCANCODE_F12"] = 0x045,
                ["SDL_SCANCODE_PRINTSCREEN"] = 0x046,
                ["SDL_SCANCODE_SCROLLLOCK"] = 0x047,
                ["SDL_SCANCODE_PAUSE"] = 0x048,
                ["SDL_SCANCODE_INSERT"] = 0x049,
                ["SDL_SCANCODE_HOME"] = 0x04A,
                ["SDL_SCANCODE_PAGEUP"] = 0x04B,
                ["SDL_SCANCODE_DELETE"] = 0x04C,
                ["SDL_SCANCODE_END"] = 0x04D,
                ["SDL_SCANCODE_PAGEDOWN"] = 0x04E,
                ["SDL_SCANCODE_RIGHT"] = 0x04F,
                ["SDL_SCANCODE_LEFT"] = 0x050,
                ["SDL_SCANCODE_DOWN"] = 0x051,
                ["SDL_SCANCODE_UP"] = 0x052,
                ["SDL_SCANCODE_NUMLOCKCLEAR"] = 0x053,
                ["SDL_SCANCODE_KP_DIVIDE"] = 0x054,
                ["SDL_SCANCODE_KP_MULTIPLY"] = 0x055,
                ["SDL_SCANCODE_KP_MINUS"] = 0x056,
                ["SDL_SCANCODE_KP_PLUS"] = 0x057,
                ["SDL_SCANCODE_KP_ENTER"] = 0x058,
                ["SDL_SCANCODE_KP_1"] = 0x059,
                ["SDL_SCANCODE_KP_2"] = 0x05A,
                ["SDL_SCANCODE_KP_3"] = 0x05B,
                ["SDL_SCANCODE_KP_4"] = 0x05C,
                ["SDL_SCANCODE_KP_5"] = 0x05D,
                ["SDL_SCANCODE_KP_6"] = 0x05E,
                ["SDL_SCANCODE_KP_7"] = 0x05F,
                ["SDL_SCANCODE_KP_8"] = 0x060,
                ["SDL_SCANCODE_KP_9"] = 0x061,
                ["SDL_SCANCODE_KP_0"] = 0x062,
                ["SDL_SCANCODE_KP_PERIOD"] = 0x063,
                ["SDL_SCANCODE_NONUSBACKSLASH"] = 0x064,
                ["SDL_SCANCODE_APPLICATION"] = 0x065,
                ["SDL_SCANCODE_POWER"] = 0x066,
                ["SDL_SCANCODE_KP_EQUALS"] = 0x067,
                ["SDL_SCANCODE_F13"] = 0x068,
                ["SDL_SCANCODE_F14"] = 0x069,
                ["SDL_SCANCODE_F15"] = 0x06A,
                ["SDL_SCANCODE_F16"] = 0x06B,
                ["SDL_SCANCODE_F17"] = 0x06C,
                ["SDL_SCANCODE_F18"] = 0x06D,
                ["SDL_SCANCODE_F19"] = 0x06E,
                ["SDL_SCANCODE_F20"] = 0x06F,
                ["SDL_SCANCODE_F21"] = 0x070,
                ["SDL_SCANCODE_F22"] = 0x071,
                ["SDL_SCANCODE_F23"] = 0x072,
                ["SDL_SCANCODE_F24"] = 0x073,
                ["SDL_SCANCODE_EXECUTE"] = 0x074,
                ["SDL_SCANCODE_HELP"] = 0x075,
                ["SDL_SCANCODE_MENU"] = 0x076,
                ["SDL_SCANCODE_SELECT"] = 0x077,
                ["SDL_SCANCODE_STOP"] = 0x078,
                ["SDL_SCANCODE_AGAIN"] = 0x079,
                ["SDL_SCANCODE_UNDO"] = 0x07A,
                ["SDL_SCANCODE_CUT"] = 0x07B,
                ["SDL_SCANCODE_COPY"] = 0x07C,
                ["SDL_SCANCODE_PASTE"] = 0x07D,
                ["SDL_SCANCODE_FIND"] = 0x07E,
                ["SDL_SCANCODE_MUTE"] = 0x07F,
                ["SDL_SCANCODE_VOLUMEUP"] = 0x080,
                ["SDL_SCANCODE_VOLUMEDOWN"] = 0x081,
                ["SDL_SCANCODE_KP_COMMA"] = 0x085,
                ["SDL_SCANCODE_KP_EQUALSAS400"] = 0x086,
                ["SDL_SCANCODE_INTERNATIONAL1"] = 0x087,
                ["SDL_SCANCODE_INTERNATIONAL2"] = 0x088,
                ["SDL_SCANCODE_INTERNATIONAL3"] = 0x089,
                ["SDL_SCANCODE_INTERNATIONAL4"] = 0x08A,
                ["SDL_SCANCODE_INTERNATIONAL5"] = 0x08B,
                ["SDL_SCANCODE_INTERNATIONAL6"] = 0x08C,
                ["SDL_SCANCODE_INTERNATIONAL7"] = 0x08D,
                ["SDL_SCANCODE_INTERNATIONAL8"] = 0x08E,
                ["SDL_SCANCODE_INTERNATIONAL9"] = 0x08F,
                ["SDL_SCANCODE_LANG1"] = 0x090,
                ["SDL_SCANCODE_LANG2"] = 0x091,
                ["SDL_SCANCODE_LANG3"] = 0x092,
                ["SDL_SCANCODE_LANG4"] = 0x093,
                ["SDL_SCANCODE_LANG5"] = 0x094,
                ["SDL_SCANCODE_LANG6"] = 0x095,
                ["SDL_SCANCODE_LANG7"] = 0x096,
                ["SDL_SCANCODE_LANG8"] = 0x097,
                ["SDL_SCANCODE_LANG9"] = 0x098,
                ["SDL_SCANCODE_ALTERASE"] = 0x099,
                ["SDL_SCANCODE_SYSREQ"] = 0x09A,
                ["SDL_SCANCODE_CANCEL"] = 0x09B,
                ["SDL_SCANCODE_CLEAR"] = 0x09C,
                ["SDL_SCANCODE_PRIOR"] = 0x09D,
                ["SDL_SCANCODE_RETURN2"] = 0x09E,
                ["SDL_SCANCODE_SEPARATOR"] = 0x09F,
                ["SDL_SCANCODE_OUT"] = 0x0A0,
                ["SDL_SCANCODE_OPER"] = 0x0A1,
                ["SDL_SCANCODE_CLEARAGAIN"] = 0x0A2,
                ["SDL_SCANCODE_CRSEL"] = 0x0A3,
                ["SDL_SCANCODE_EXSEL"] = 0x0A4,
                ["SDL_SCANCODE_KP_00"] = 0x0B0,
                ["SDL_SCANCODE_KP_000"] = 0x0B1,
                ["SDL_SCANCODE_THOUSANDSSEPARATOR"] = 0x0B2,
                ["SDL_SCANCODE_DECIMALSEPARATOR"] = 0x0B3,
                ["SDL_SCANCODE_CURRENCYUNIT"] = 0x0B4,
                ["SDL_SCANCODE_CURRENCYSUBUNIT"] = 0x0B5,
                ["SDL_SCANCODE_KP_LEFTPAREN"] = 0x0B6,
                ["SDL_SCANCODE_KP_RIGHTPAREN"] = 0x0B7,
                ["SDL_SCANCODE_KP_LEFTBRACE"] = 0x0B8,
                ["SDL_SCANCODE_KP_RIGHTBRACE"] = 0x0B9,
                ["SDL_SCANCODE_KP_TAB"] = 0x0BA,
                ["SDL_SCANCODE_KP_BACKSPACE"] = 0x0BB,
                ["SDL_SCANCODE_KP_A"] = 0x0BC,
                ["SDL_SCANCODE_KP_B"] = 0x0BD,
                ["SDL_SCANCODE_KP_C"] = 0x0BE,
                ["SDL_SCANCODE_KP_D"] = 0x0BF,
                ["SDL_SCANCODE_KP_E"] = 0x0C0,
                ["SDL_SCANCODE_KP_F"] = 0x0C1,
                ["SDL_SCANCODE_KP_XOR"] = 0x0C2,
                ["SDL_SCANCODE_KP_POWER"] = 0x0C3,
                ["SDL_SCANCODE_KP_PERCENT"] = 0x0C4,
                ["SDL_SCANCODE_KP_LESS"] = 0x0C5,
                ["SDL_SCANCODE_KP_GREATER"] = 0x0C6,
                ["SDL_SCANCODE_KP_AMPERSAND"] = 0x0C7,
                ["SDL_SCANCODE_KP_DBLAMPERSAND"] = 0x0C8,
                ["SDL_SCANCODE_KP_VERTICALBAR"] = 0x0C9,
                ["SDL_SCANCODE_KP_DBLVERTICALBAR"] = 0x0CA,
                ["SDL_SCANCODE_KP_COLON"] = 0x0CB,
                ["SDL_SCANCODE_KP_HASH"] = 0x0CC,
                ["SDL_SCANCODE_KP_SPACE"] = 0x0CD,
                ["SDL_SCANCODE_KP_AT"] = 0x0CE,
                ["SDL_SCANCODE_KP_EXCLAM"] = 0x0CF,
                ["SDL_SCANCODE_KP_MEMSTORE"] = 0x0D0,
                ["SDL_SCANCODE_KP_MEMRECALL"] = 0x0D1,
                ["SDL_SCANCODE_KP_MEMCLEAR"] = 0x0D2,
                ["SDL_SCANCODE_KP_MEMADD"] = 0x0D3,
                ["SDL_SCANCODE_KP_MEMSUBTRACT"] = 0x0D4,
                ["SDL_SCANCODE_KP_MEMMULTIPLY"] = 0x0D5,
                ["SDL_SCANCODE_KP_MEMDIVIDE"] = 0x0D6,
                ["SDL_SCANCODE_KP_PLUSMINUS"] = 0x0D7,
                ["SDL_SCANCODE_KP_CLEAR"] = 0x0D8,
                ["SDL_SCANCODE_KP_CLEARENTRY"] = 0x0D9,
                ["SDL_SCANCODE_KP_BINARY"] = 0x0DA,
                ["SDL_SCANCODE_KP_OCTAL"] = 0x0DB,
                ["SDL_SCANCODE_KP_DECIMAL"] = 0x0DC,
                ["SDL_SCANCODE_KP_HEXADECIMAL"] = 0x0DD,
                ["SDL_SCANCODE_LCTRL"] = 0x0E0,
                ["SDL_SCANCODE_LSHIFT"] = 0x0E1,
                ["SDL_SCANCODE_LALT"] = 0x0E2,
                ["SDL_SCANCODE_LGUI"] = 0x0E3,
                ["SDL_SCANCODE_RCTRL"] = 0x0E4,
                ["SDL_SCANCODE_RSHIFT"] = 0x0E5,
                ["SDL_SCANCODE_RALT"] = 0x0E6,
                ["SDL_SCANCODE_RGUI"] = 0x0E7,
                ["SDL_SCANCODE_MODE"] = 0x101,
                ["SDL_SCANCODE_AUDIONEXT"] = 0x102,
                ["SDL_SCANCODE_AUDIOPREV"] = 0x103,
                ["SDL_SCANCODE_AUDIOSTOP"] = 0x104,
                ["SDL_SCANCODE_AUDIOPLAY"] = 0x105,
                ["SDL_SCANCODE_AUDIOMUTE"] = 0x106,
                ["SDL_SCANCODE_MEDIASELECT"] = 0x107,
                ["SDL_SCANCODE_WWW"] = 0x108,
                ["SDL_SCANCODE_MAIL"] = 0x109,
                ["SDL_SCANCODE_CALCULATOR"] = 0x10A,
                ["SDL_SCANCODE_COMPUTER"] = 0x10B,
                ["SDL_SCANCODE_AC_SEARCH"] = 0x10C,
                ["SDL_SCANCODE_AC_HOME"] = 0x10D,
                ["SDL_SCANCODE_AC_BACK"] = 0x10E,
                ["SDL_SCANCODE_AC_FORWARD"] = 0x10F,
                ["SDL_SCANCODE_AC_STOP"] = 0x110,
                ["SDL_SCANCODE_AC_REFRESH"] = 0x111,
                ["SDL_SCANCODE_AC_BOOKMARKS"] = 0x112,
                ["SDL_SCANCODE_BRIGHTNESSDOWN"] = 0x113,
                ["SDL_SCANCODE_BRIGHTNESSUP"] = 0x114,
                ["SDL_SCANCODE_DISPLAYSWITCH"] = 0x115,
                ["SDL_SCANCODE_KBDILLUMTOGGLE"] = 0x116,
                ["SDL_SCANCODE_KBDILLUMDOWN"] = 0x117,
                ["SDL_SCANCODE_KBDILLUMUP"] = 0x118,
                ["SDL_SCANCODE_EJECT"] = 0x119,
                ["SDL_SCANCODE_SLEEP"] = 0x11A,
                ["SDL_SCANCODE_APP1"] = 0x11B,
                ["SDL_SCANCODE_APP2"] = 0x11C
            }
        }
        return setmetatable({}, {
            __index = function(self, key)
                local normalized = key:upper()
                return sdl[key]
                or  sdl.scancodes["SDL_".. normalized] or sdl.scancodes[normalized]
                or  sdl.dll["SDL_".. key] or sdl.dll[key]
                or  nil
            end,
            __newindex = function(self, key, value) end,
        })
    end},
    {"game", function()
        local sdl = Zoomies.sdl
        local game = {window = sdl.GL_GetCurrentWindow()}
        game.renderer = sdl.GetRenderer(game.window)
        game.zoomies = 512
        return game
    end}
}

for k, v in pairs(Zoomies.libs) do
    local identifier, constructor = v[1], v[2]
    print("[Zoomies]", "Building ".. identifier.. " ...")
    local success, result = pcall(constructor)
    if success then
        print("[Zoomies]", "Built ".. identifier.. ".")
        Zoomies[identifier] = result
    else
        print("[Zoomies]", "Failure building ".. identifier.. ":\n".. tostring(result))
    end
end

print("[Zoomies]", "Constructed.")
return Zoomies

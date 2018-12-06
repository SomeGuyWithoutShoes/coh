#NoEnv
#Warn
#maxThreadsPerHotkey, 2
SendMode Input
SetWorkingDir %A_ScriptDir%
KeyStack:={}
#IfWinActive ahk_exe Fallout76.exe

; Hotkeys.
;  - Hotkeys take args:
;    sKey       (What key to repeat)
;    nDelay     (Base delay, defaults to 0)
;    bRandomize (Whether to randomize or not, rrdefault 1)
;    nMin       (Minimum value, default 0)
;    nMax       (Maximum value, default 8)
F1::ToggleRepeatKey("r")
F2::ToggleRepeatKey("e")

; Methods.
ToggleRepeatKey(sKey, nDelay:=0, bRandomize:=1, nMin:=0, nMax:=8) {
    Global
    
    KeyStack[A_ThisHotkey]:=!KeyStack[A_ThisHotkey]
    While (KeyStack[A_ThisHotkey]=1) {
        Send, {%sKey% down}
        Sleep, % CalculateDelay(nDelay, bRandomize, nMin, nMax)
        Send, {%sKey% up}
        Sleep, % CalculateDelay(nDelay, bRandomize, nMin, nMax)
    }
    return
}
CalculateDelay(nDelay, bRandomize, nMin, nMax) {
    nResult:=nDelay
    if (bRandomize) {
        Random, nRandom, %nMin%, %nMax%
        nResult:=nResult+nRandom
    }
    return (nDelay=-1)? nResult: nDelay
}

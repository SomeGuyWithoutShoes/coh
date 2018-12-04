#NoEnv
#Warn
#maxThreadsPerHotkey, 2
SendMode Input
SetWorkingDir %A_ScriptDir%
KeyStack:={}
#IfWinActive ahk_exe Fallout76.exe

; Configuration.    ; Default set to randomize between 0ms and 8ms.
nGeneralDelay:=0    ; How long will each action take by default.
bRandomizeDelay:=1  ; If or if not to add randomization on top of the default.
nMinOffset:=0       ; Minimum amount of randomization.
nMaxOffset:=8       ; Maximum amount of randomization.

; Hotkeys.
F1::ToggleRepeatKey("r")
F2::ToggleRepeatKey("e")

; Methods.
ToggleRepeatKey(sKeyToRepeat) {
    Global
    
    KeyStack[A_ThisHotkey]:=!KeyStack[A_ThisHotkey]
    While (KeyStack[A_ThisHotkey]=1) {
        Send, {%sKey% down}
        Sleep, % CalculateDelay()
        Send, {%sKey% up}
        Sleep, % CalculateDelay()
    }
    return
}
CalculateDelay(nStatic:=-1) {
    Global
    
    nResult:=nGeneralDelay
    if (bRandomizeDelay) {
        Random, nRandom, %nMinOffset%, %nMaxOffset%
        nResult:=nResult+nRandom
    }
    return (nStatic=-1)? nResult: nStatic
}

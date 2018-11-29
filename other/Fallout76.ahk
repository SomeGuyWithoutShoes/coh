#NoEnv
#Warn
#maxThreadsPerHotkey, 2
SendMode Input
SetWorkingDir %A_ScriptDir%
#IfWinActive ahk_exe Fallout76.exe

;
;   Configurable values.
;
nGeneralDelay:=1

bRandomizeDelay:=1
nMinOffset:=6
nMaxOffset:=6

;
;   Natives.
;
bRepeatR:=0
bRepeatE:=0

F1::
    bRepeatR:=!bRepeatR
    ToolTip, AHK Informant:`n - F1 is currently active.
    while (bRepeatR=1) {
        Send, {r down}
        Sleep, % fCalculateDelay()
        Send, {r up}
        Sleep, % fCalculateDelay()
    }
    ToolTip
    return

F2::
    bRepeatE:=!bRepeatE
    ToolTip, AHK Informant:`n - F2 is currently active.
    while (bRepeatE=1) {
        Send, {e down}
        Sleep, % fCalculateDelay()
        Send, {e up}
        Sleep, % fCalculateDelay()
    }
    ToolTip
    return

fCalculateDelay() {
    Global
    
    nResult:=nGeneralDelay
    if (bRandomizeDelay) {
        Random, nRandom, %nMinOffset%, %nMaxOffset%
        nResult:=nResult+nRandom
    }
    return nResult
}

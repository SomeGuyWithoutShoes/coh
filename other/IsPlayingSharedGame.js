// ==UserScript==
// @name         IsPlayingSharedGame
// @namespace    http://tampermonkey.net/
// @version      1.Borgar
// @description  Adds a IsPlayingSharedGame button on steam profile pages.
// @author       COH
// @include      *://steamcommunity.com/id/*
// @include      *://steamcommunity.com/profiles/*
// @grant        none
// ==/UserScript==

addEventListener("load", () => {
    let config = {
             api_key: "",
             appid: "374320"
        },
        targetProfile = g_rgProfileData

    if (targetProfile.steamid !== g_steamID) {
        let profile_header_actions = document.body.querySelector(".profile_header_actions"),

            btn_isplayingsharedgame = document.createElement("a"),
            txt_isplayingsharedgame = document.createElement("span"),

            request = new XMLHttpRequest,

            gateway = "//api.steampowered.com/",
            endpoint = "IPlayerService/IsPlayingSharedGame/v0001/",
            appid = "0"

        request.addEventListener("load", loadEvent => {
            let response = request.response
            
            if (!0 !== /Forbidden/i.test(response)) {
                let data = JSON.parse(response).response
                
                if ("0" !== data.lender_steamid) {
                    ShowConfirmDialog(
                        "IsPlayingSharedGame",
                        `${targetProfile.personaname} does not own a copy for Application #${appid}.\n\nRedirect to the owner?`
                    ).then(dothing => location = `//steamcommunity.com/profiles/${data.lender_steamid}`)
                } else {
                    ShowAlertDialog(
                        "IsPlayingSharedGame",
                        `${targetProfile.personaname} either owns Application #${appid}, or has never ran it.`
                    ).then(resetSending => request.sending = false)
                }
            } else {
                ShowAlertDialog(
                    "IsPlayingSharedGame",
                    response
                ).then(resetSending => request.sending = false)
            }
        })
        request.addEventListener("error", errorEvent => {
            ShowAlertDialog(
                "IsPlayingSharedGame",
                "Failed to send the request; try again later.",
                "Ok :("
            ).then(resetSending => request.sending = false)
        })
        btn_isplayingsharedgame.addEventListener("click", clickEvent => {
            let modal = ShowPromptDialog("IsPlayingSharedGame", "Enter the desired AppID to check family share for.\n(Or use the default configured one)")
            modal.m_$Content[0].querySelector("input").value = config.appid
            modal.then(data => {
                appid = data
                if (!request.sending) {
                    request.sending = true
                    request.open(
                        "get",
                        `${gateway}${endpoint}?key=${config.api_key}&steamid=${targetProfile.steamid}&appid_playing=${appid}&format=json`
                    )
                    request.send()
                }
            })
            clickEvent.preventDefault()
        })
        btn_isplayingsharedgame.className = "btn_profile_action btn_medium"
        txt_isplayingsharedgame.appendChild(document.createTextNode("IsPlayingSharedGame"))
        btn_isplayingsharedgame.appendChild(txt_isplayingsharedgame)
        profile_header_actions.appendChild(btn_isplayingsharedgame)
    }
})

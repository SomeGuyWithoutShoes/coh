//META{"name":"NoSeals_igromaamamru"}*//
class NoSeals_igromaamamru {constructor() {
    
    const Export = new class $export {}
    const Plugin = new class $plugin {}
    
    Plugin.loader = () => {
        Plugin.modules = BDV2.WebpackModules.findByUniqueProperties(["sendTyping"])
        
        Object.assign(Export.default, {Export, Plugin})
        utils.log(`[${Export.getters.getName()}] Plugin initialized.`)
    }
    Plugin.starter = () => {
        Plugin.waiter = setInterval(() => {
            let Master = bdplugins.NoSeals.plugin.default.Plugin
            if (Master) {
                let submitting = 0
                let igromaamamru = ({data, action}) => {
                    const channel = action.channelId
                    const message = action.message
                    const author = Master.modules[5].getUser(message.author.id)
                    const owner = Master.modules[5].getCurrentUser()
                    if (!message.NoSeals)
                    if (author.id !== owner.id && message.content == "<:igromaamamru:463126116358553635>" && !submitting) {
                        submitting = 1
                        setTimeout(() => {
                            Master.modules[4].enqueue({
                                type: "send",
                                message: {
                                    content: "<:igromaamamru:463126116358553635>",
                                    channelId: channel
                                }
                            }, receiver => {})
                            submitting = 0
                        }, Math.random() * 7500 + 2500)
                    }
                }
                
                Master.events.MESSAGE_CREATE.push(igromaamamru)
                if (!Plugin.restore) Plugin.restore = () => {
                    let index = Master.events.MESSAGE_CREATE.indexOf(igromaamamru)
                    if (index > -1) {
                        Master.events.MESSAGE_CREATE.splice(index, 1)
                    }
                }
                utils.log(`[${Export.getters.getName()}] Plugin enabled.`)
                Plugin.waiter = clearInterval(Plugin.waiter)
            }
        }, 1000)
        utils.log(`[${Export.getters.getName()}] Plugin checking for master ...`)
    }
    Plugin.stopper = () => {
        if (Plugin.restore) Plugin.restore()
        if (Plugin.waiter) Plugin.waiter = clearInterval(Plugin.waiter)
        utils.log(`[${Export.getters.getName()}] Plugin disabled.`)
    }
    
    Export.events = {
        load: Plugin.loader || (() => !0),
        unload: Plugin.unloader || (() => !0),
        start: Plugin.starter || (() => !0),
        stop: Plugin.stopper || (() => !0)
    }
    
    Export.getters = {
        getName: () => "NoSeals_igromaamamru",
        getDescription: () => ":igromaamamru:",
        getVersion: () => "Version",
        getAuthor: () => ":COH:",
        getSettingsPanel: () => "Nothing to see here"
    }
    
    Export.default = {}
    
    return Object.assign(new class $module {}, Export.getters, Export.events, {default: Export.default})
    
}}

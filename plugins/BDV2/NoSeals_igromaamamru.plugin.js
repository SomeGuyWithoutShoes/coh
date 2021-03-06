//META{"name":"NoSeals_igromaamamru"}*//
class NoSeals_igromaamamru {constructor() {
    
    const Export = new class $export {}
    const Plugin = new class $plugin {}
    
    Plugin.loader = () => {
        Plugin.modules = BDV2.WebpackModules.findByUniqueProperties(["put"])
        
        Object.assign(Export.default, {Export, Plugin})
        Utils.log(`[${Export.getters.getName()}] Plugin initialized.`)
    }
    Plugin.starter = () => {
        Plugin.waiter = setInterval(() => {
            let Master = bdplugins.NoSeals.plugin.default.Plugin
            let igro = {
                maamamru: "498168816627482645",
                mame: "igromaamamru",
                maam: /<(:igromaamamru:)\d*?>/
            }
            if (Master) {
                let submitting = 0
                let igromaamamru = ({data, action}) => {
                    const channel = action.channelId
                    const message = action.message
                    const author = Master.modules[5].getUser(message.author.id)
                    const owner = Master.modules[5].getCurrentUser()
                    if (!message.NoSeals)
                    if (author.id !== owner.id && igro.maam.test(message.content) && !submitting) {
                        submitting = 1
                        setTimeout(() => {
                            Plugin.modules.put(Master.modules[1].Endpoints.REACTION(
                                channel, message.id, `${igro.mame}:${igro.maamamru}`, "@me"
                            ))
                            submitting = 0
                        }, 1500)
                    }
                }
                
                Master.events.MESSAGE_CREATE.push(igromaamamru)
                if (!Plugin.restore) Plugin.restore = () => {
                    let index = Master.events.MESSAGE_CREATE.indexOf(igromaamamru)
                    if (index > -1) {
                        Master.events.MESSAGE_CREATE.splice(index, 1)
                    }
                }
                Utils.log(`[${Export.getters.getName()}] Plugin enabled.`)
                Plugin.waiter = clearInterval(Plugin.waiter)
            }
        }, 1000)
        Utils.log(`[${Export.getters.getName()}] Plugin checking for master ...`)
    }
    Plugin.stopper = () => {
        if (Plugin.restore) Plugin.restore()
        if (Plugin.waiter) Plugin.waiter = clearInterval(Plugin.waiter)
        Utils.log(`[${Export.getters.getName()}] Plugin disabled.`)
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

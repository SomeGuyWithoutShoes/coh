//META{"name":"Bob"}*//
class Bob {constructor() {
    
    const Export = new class $export {}
    const Plugin = new class $plugin {}
    
    Plugin.loader = () => {
        Plugin.modules = [
            BDV2.WebpackModules.findByUniqueProperties(["dispatch"]),
            BDV2.WebpackModules.findByUniqueProperties(["ActionTypes"]),
        ]
        
        Object.assign(Export.default, {Export, Plugin})
    }
    Plugin.starter = () => {
        Plugin.restore = []
        
        Plugin.modules[0].dispatch({
            user: {
                username: "bob"
            },
            type: Plugin.modules[1].ActionTypes.USER_UPDATE
        })
    }
    Plugin.stopper = () => {
        for (let i in Plugin.restore)
            Plugin.restore[i]()
        
        Plugin.modules[0].dispatch({
            user: {
                username: "everyone"
            },
            type: Plugin.modules[1].ActionTypes.USER_UPDATE
        })
    }
    
    Export.events = {
        load: Plugin.loader || (() => !0),
        unload: Plugin.unloader || (() => !0),
        start: Plugin.starter || (() => !0),
        stop: Plugin.stopper || (() => !0)
    }
    
    Export.getters = {
        getName: () => "Bob",
        getDescription: () => "What if @everyone was @bob?",
        getVersion: () => "Version",
        getAuthor: () => ":COH:",
        getSettingsPanel: null
    }
    
    Export.default = {}
    
    return Object.assign(new class $module {}, Export.getters, Export.events, {default: Export.default})
    
}}

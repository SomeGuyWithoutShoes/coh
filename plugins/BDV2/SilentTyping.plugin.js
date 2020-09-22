//META{"name":"SilentTyping"}*//
class SilentTyping {constructor() {
    const Export = new class $export {}
    const Plugin = new class $plugin {}
    Plugin.loader = () => {
        Plugin.modules = BdApi.findModuleByProps("startTyping")
        
        Object.assign(Export.default, {Export, Plugin})
    }
    Plugin.starter = () => {
        if (!Plugin.restore) Plugin.restore = BdApi.monkeyPatch(Plugin.modules, "startTyping", {
            instead () {}
        })
    }
    Plugin.stopper = () => {
        if (Plugin.restore) Plugin.restore()
    }
    Export.events = {
        load: Plugin.loader || (() => !0),
        unload: Plugin.unloader || (() => !0),
        start: Plugin.starter || (() => !0),
        stop: Plugin.stopper || (() => !0)
    }
    Export.getters = {
        getName: () => "SilentTyping",
        getDescription: () => !1,
        getVersion: () => !1,
        getAuthor: () => !1,
        getSettingsPanel: !1
    }
    Export.default = {}
    return Object.assign(new class $module {}, Export.getters, Export.events, {default: Export.default})
    
}}

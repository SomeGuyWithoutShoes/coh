//META{"name":"Capitalfuckyou"}*//
class Capitalfuckyou {constructor() {
    
    const Export = new class $export {}
    const Plugin = new class $plugin {}
    
    Plugin.loader = () => {
        Object.assign(Export.default, {Export, Plugin})
        Utils.log(`[${Export.getters.getName()}] Plugin initialized.`)
    }
    Plugin.starter = () => {
        const EVENT = e => e.altKey || e.ctrlKey || e.shiftKey || e.metaKey || e.which === 8 || (event.target.value = event.target.value
            .replace(/[^\w\s<>:@#]/g, "")
            .replace(/(.)/g, c => Math.random() * 100 > 50? c.toUpperCase(): c.toLowerCase()))
        
        document.addEventListener("keydown", EVENT)
        Plugin.restore = () => document.removeEventListener("keydown", EVENT)
        Utils.log(`[${Export.getters.getName()}] Plugin enabled.`)
    }
    Plugin.stopper = () => {
        if (Plugin.restore) Plugin.restore()
        Utils.log(`[${Export.getters.getName()}] Plugin disabled.`)
    }
    
    Export.events = {
        load: Plugin.loader || (() => !0),
        unload: Plugin.unloader || (() => !0),
        start: Plugin.starter || (() => !0),
        stop: Plugin.stopper || (() => !0)
    }
    
    Export.getters = {
        getName: () => "Capitalfuckyou",
        getDescription: () => "",
        getVersion: () => "Version",
        getAuthor: () => ":COH:",
    }
    
    Export.default = {}
    
    return Object.assign(new class $module {}, Export.getters, Export.events, {default: Export.default})
    
}}

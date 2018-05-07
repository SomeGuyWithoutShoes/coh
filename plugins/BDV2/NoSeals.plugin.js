//META{"name":"NoSeals"}*//
class NoSeals {constructor() {
    
    const Export = new class $export {}
    const Plugin = new class $plugin {}
    
    Plugin.config = {}
//  {message, channel, ActionTypes}
    Plugin.config.preserveTitle = () => `[NoSeals]`
    Plugin.config.preserveFooter = () => {text: `Message delet protection since 1942`}
    Plugin.config.preserveColor = () => 0x112233
    Plugin.config.preserveTTS = () => false
//  {message, author, channel}
    Plugin.config.embedContent = ({author}) => `<@!${author.id}>, : ^ )`
    Plugin.config.embedFooter = ({channel}) => `in #${channel.name}`
    Plugin.config.embedColor = () => 0xFFAA22
    
    Plugin.loader = () => {
        Plugin.modules = [
            BDV2.WebpackModules.findByUniqueProperties(["dispatch"]),
            BDV2.WebpackModules.findByUniqueProperties(["ActionTypes"]),
            BDV2.WebpackModules.findByUniqueProperties(["receiveMessage"]),
            BDV2.WebpackModules.findByUniqueProperties(["getChannel"]),
            BDV2.WebpackModules.findByUniqueProperties(["enqueue"]),
            BDV2.WebpackModules.findByUniqueProperties(["getUser"]),
        ]
        Plugin.messageCache = {}
        Plugin.daemons = []
        Plugin.retaliate = id => {
            const message = Plugin.messageCache[id]
            const channel = Plugin.modules[3].getChannel(message.channel_id)
            const ActionTypes = Plugin.modules[1].ActionTypes
            
            if (!message.NoSeals) {
                if (Date.now() - Date.parse(message.timestamp) <= 6e4) {
                //if (message.mention_everyone || message.mention_roles.length > 0 || message.mentions.length > 0) {
                    Object.assign(message, {
                        NoSeals: true,
                        id: `9${message.id}`,
                        nonce: `NS.${message.id}`,
                        guild_id: channel.guild_id,
                        tts: Plugin.config.preserveTTS({message,channel,ActionTypes})
                    })
                    message.embeds.push({
                        title: Plugin.config.preserveTitle({message,channel,ActionTypes}),
                        footer: Plugin.config.preserveFooter({message,channel,ActionTypes}),
                        url: `javascript: window.NoSeals.quote(${JSON.stringify(message)})`,
                        color: Plugin.config.preserveColor({message,channel,ActionTypes}),
                        timestamp: message.timestamp
                    })
                    
                    Plugin.modules[0].dispatch({
                        channelId: message.channel_id,
                        message: message,
                        optimistic: false,
                        NoSeals: true,
                        type: ActionTypes.MESSAGE_CREATE
                    })
                    
                    delete Plugin.messageCache[id]
                }
            } else {
                delete Plugin.messageCache[id]
            }
        }
        Plugin.quote = message => {
            const author = Plugin.modules[5].getUser(message.author.id)
            const channel = Plugin.modules[3].getChannel(message.channel_id)
            Plugin.modules[4].enqueue({
                type: "send",
                message: {
                    channelId: channel.id,
                    content: Plugin.config.embedContent({message,author,channel}),
                    tts: false,
                    embed: {
                        author: {
                            name: author.username,
                            icon_url: author.avatarURL
                        },
                        description: message.content,
                        footer: {
                            text: Plugin.config.embedFooter({message,author,channel})
                        },
                        color: Plugin.config.embedColor({message,author,channel}),
                        timestamp: message.timestamp
                    }
                }
            }, receiver => {
                if (receiver.ok) {
                    Plugin.modules[2].receiveMessage(channel.id, receiver.body)
                } else if (receiver.status >= 400 && receiver.status < 500 && receiver.body) {
                    Plugin.modules[2].sendClydeError(channel.id, receiver.body.code)
                    Plugin.modules[0].dispatch({
                        type: Plugin.modules[1].MESSAGE_SEND_FAILED,
                        messageId: message.id,
                        channelId: channel.id
                    })
                }
            })
        }
        
        Object.assign(window, {NoSeals: Plugin})
        Object.assign(Export.default, {Export, Plugin})
    }
    Plugin.starter = () => {
        Plugin.restore = [
            Utils.monkeyPatch(Plugin.modules[0], "dispatch", {
                before (data) {
                    const action = data.methodArguments[0]
                    const ActionTypes = Plugin.modules[1].ActionTypes
                    
                    if (Plugin.debug)
                        Plugin.debug(data)
                    
                    if (action.type === ActionTypes.MESSAGE_CREATE) {
                        const channel = data.methodArguments[0].channel_id
                        const message = data.methodArguments[0].message
                        
                        Plugin.messageCache[message.id] = message
                        
                        const daemon = {state: 0, runtime: 6e4}
                        daemon.process = setTimeout(wait => {
                            if (Plugin.messageCache[message.id])
                                delete Plugin.messageCache[message.id]
                            daemon.state = 1
                        }, daemon.runtime)
                        
                        Plugin.daemons.push(daemon)
                    } else if (action.type === ActionTypes.MESSAGE_DELETE) {
                        const message = data.methodArguments[0].id
                        
                        if (Plugin.messageCache[message])
                            Plugin.retaliate(message)
                    }
                }
            })
        ]
        Plugin.flusher = setInterval(flush => {
            const daemons = []
            const messageCache = []
            
            for (let daemon in Plugin.daemons)
            if (Plugin.daemons[daemon].state === 0)
                daemons.push(Plugin.daemons[daemon])
            
            for (let message in Plugin.messageCache)
            if (Plugin.messageCache[message])
                messageCache[message]=Plugin.messageCache[message]
            
            Plugin.daemons = daemons
            Plugin.messageCache = messageCache
        }, 10000)
    }
    Plugin.stopper = () => {
        for (let i in Plugin.restore)
            Plugin.restore[i]()
        
        clearInterval(Plugin.flusher)
    }
    
    Export.events = {
        load: Plugin.loader || (() => !0),
        unload: Plugin.unloader || (() => !0),
        start: Plugin.starter || (() => !0),
        stop: Plugin.stopper || (() => !0)
    }
    
    Export.getters = {
        getName: () => "NoSeals",
        getDescription: () => "No silent pings.",
        getVersion: () => "Version",
        getAuthor: () => ":COH:",
        getSettingsPanel: null
    }
    
    Export.default = {}
    
    return Object.assign(new class $module {}, Export.getters, Export.events, {default: Export.default})
    
}}

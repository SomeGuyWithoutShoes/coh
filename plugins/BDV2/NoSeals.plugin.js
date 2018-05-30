//META{"name":"NoSeals"}*//
class NoSeals {constructor() {
    
    const Export = new class $export {}
    const Plugin = new class $plugin {}
    
    Plugin.config = {}
//  {message, author, channel, ActionTypes}
    Plugin.config.preserveTitle = () => `[NoSeals]`
    Plugin.config.preserveFooter = () => new Object({text: `Message delet protection since 1942`})
    Plugin.config.preserveColor = () => 0x112233
    Plugin.config.preserveTTS = () => false
    
//  {message, author, channel}
    Plugin.config.embedContent = ({author}) => `<@!${author.id}>, that's a real thonker.`
    Plugin.config.embedFooter = ({channel}) => new Object({text: `in #${channel.name}`})
    Plugin.config.embedColor = () => 0xFFAA22
    
//  {message, author, emoji}
    Plugin.config.reactionTitle = () => `React delets`
    Plugin.config.reactionDescription = ({author,emoji}) => `${author.username} removed ${emoji.name}.\n`
    Plugin.config.reactionFooter = () => new Object({text: `they gone :(`})
    Plugin.config.reactionColor = () => 0xCAFFEE
    
    Plugin.loader = () => {
        Plugin.modules = [
            BDV2.WebpackModules.findByUniqueProperties(["dispatch"]),
            BDV2.WebpackModules.findByUniqueProperties(["ActionTypes"]),
            BDV2.WebpackModules.findByUniqueProperties(["receiveMessage"]),
            BDV2.WebpackModules.findByUniqueProperties(["getChannel"]),
            BDV2.WebpackModules.findByUniqueProperties(["enqueue"]),
            BDV2.WebpackModules.findByUniqueProperties(["getUser"]),
        ]
        Plugin.events = {
            LOAD_MESSAGES_SUCCESS: [
                ({data, action}) => {
                    const messages = action.messages
                    const channel = action.channelId
                    for (let i = 0; i < messages.length; i++) {
                        const message = messages[i]
                        
                        if (!Plugin.messageCache[message.id]) {
                            const daemon = {state: 0, runtime: 6e4}
                        
                            Plugin.daemons.push(daemon.process = setTimeout(wait => {
                                if (Plugin.messageCache[message.id])
                                    delete Plugin.messageCache[message.id]
                                daemon.state = 1
                            }, daemon.runtime))
                            
                            Plugin.messageCache[message.id] = message
                        }
                    }
                }
            ],
            MESSAGE_CREATE: [
                ({data, action}) => {
                    const channel = data.methodArguments[0].channel_id
                    const message = data.methodArguments[0].message
                    
                    if (!message.NoSeals && !Plugin.messageCache[message.id]) {
                        const daemon = {state: 0, runtime: 6e4}
                        
                        Plugin.daemons.push(daemon.process = setTimeout(wait => {
                            if (Plugin.messageCache[message.id])
                                delete Plugin.messageCache[message.id]
                            daemon.state = 1
                        }, daemon.runtime))
                        
                        Plugin.messageCache[message.id] = message
                    }
                }
            ],
            MESSAGE_DELETE: [
                ({data, action}) => {
                    const id = data.methodArguments[0].id
                    
                    if (Plugin.messageCache[id]) {
                        const message = Plugin.messageCache[id]
                        const author = Plugin.modules[5].getUser(message.author.id)
                        const channel = Plugin.modules[3].getChannel(message.channel_id)
                        const ActionTypes = Plugin.modules[1].ActionTypes
                        
                        if (!message.NoSeals) {
                            if (Date.now() - Date.parse(message.timestamp) <= 6e4) {
                                Object.assign(message, {
                                    NoSeals: true,
                                    id: `9${message.id}`,
                                    nonce: `NS.${message.id}`,
                                    guild_id: channel.guild_id,
                                    tts: Plugin.config.preserveTTS({message,channel,author,ActionTypes})
                                })
                                Plugin.attachEmbed({message, embed: {
                                    title: Plugin.config.preserveTitle({message,channel,author,ActionTypes}),
                                    footer: Plugin.config.preserveFooter({message,channel,author,ActionTypes}),
                                    url: `javascript: window.NoSeals.quote(${JSON.stringify(message)})`,
                                    color: Plugin.config.preserveColor({message,channel,author,ActionTypes}),
                                    timestamp: message.timestamp
                                }})
                                Plugin.modules[0].dispatch({
                                    channelId: message.channel_id,
                                    message: message,
                                    optimistic: false,
                                    NoSeals: true,
                                    type: ActionTypes.MESSAGE_CREATE
                                })
                                
                                delete Plugin.messageCache[id]
                            }
                        }
                    }
                }
            ],
            MESSAGE_REACTION_REMOVE: [
                ({data, action}) => {
                    const messageId = action.messageId
                    const emoji = action.emoji
                    
                    if (!action.optimistic)
                    if (Plugin.messageCache[messageId]) {
                        const message = Plugin.messageCache[messageId]
                        const channel = Plugin.modules[3].getChannel(message.channel_id)
                        const author = Plugin.modules[5].getUser(action.userId)
                        const ActionTypes = Plugin.modules[1].ActionTypes
                        let reactionBody = null
                        
                        for (let i = 0; i < message.embeds.length; i++)
                        if (message.embeds[i].title === Plugin.config.reactionTitle({message,emoji,author}))
                            reactionBody = message.embeds[i]
                        
                        if (!reactionBody)
                            reactionBody = Plugin.attachEmbed({message, embed: {
                                title: Plugin.config.reactionTitle({message,emoji,author}),
                                description: "",
                                footer: Plugin.config.reactionFooter({message,emoji,author}),
                                color: Plugin.config.reactionColor({message,emoji,author}),
                                timestamp: message.timestamp
                            }})
                        
                        reactionBody.description += Plugin.config.reactionDescription({message,emoji,author})
                        
                        Plugin.modules[0].dispatch({
                            channelId: message.channel_id,
                            message: message,
                            optimistic: true,
                            type: ActionTypes.MESSAGE_UPDATE
                        })
                    }
                }
            ]
        }
        Plugin.attachEmbed = data => {
            const {message, embed} = data
            
            if (message && embed)
                return message.embeds[message.embeds.push(embed)-1]
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
                        footer: Plugin.config.embedFooter({message,author,channel}),
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
        Plugin.patchDispatcher = () => Utils.monkeyPatch(Plugin.modules[0], "dispatch", {
            before (data) {
                const action = data.methodArguments[0]
                const ActionTypes = Plugin.modules[1].ActionTypes
                
                if (Plugin.debug)
                    Plugin.debug(data)
                
                if (action.type in Plugin.events)
                for (let handler in Plugin.events[action.type])
                    Plugin.events[action.type][handler]({data, action, Plugin})
            }
        })
        Plugin.restore = [Plugin.patchDispatcher()]
        Plugin.flusher = () => {
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
        }
        Plugin.flushing = setInterval(Plugin.flusher, 10000)
        Plugin.messageCache = {}
        Plugin.daemons = []
        
        Object.assign(window, {NoSeals: Plugin})
        Object.assign(Export.default, {Export, Plugin})
        
        utils.log(`[${Export.getters.getName()}] Service initialized.`)
    }
    Plugin.starter = () => {
        if (!Plugin.modules[0].dispatch.__monkeyPatched)
            Plugin.restore = [Plugin.patchDispatcher()]
        
        if (!Plugin.flushing)
            Plugin.flushing = setInterval(Plugin.flusher, 10000)
        
        utils.log(`[${Export.getters.getName()}] Service has been enabled.`)
    }
    Plugin.stopper = () => {
        for (let i in Plugin.restore)
            Plugin.restore[i]()
        
        clearInterval(Plugin.flushing)
        
        utils.log(`[${Export.getters.getName()}] Service disabled.`)
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

//META{"name":"aesthetics"}*//
    let aesthetics = (() => {
        let E_EITHER = (input) => {
            let regular = /[\x20\x21-\x7E\u3000\uFF01-\uFF5E]/
            return input.length === 1 && regular.test(input)
        }
        let E_WHICH = (input) => {
            let reg_latin = /[\x20\x21-\x7E]/,
                reg_width = /[\u3000\uFF01-\uFF5E]/
            
            return input.match(reg_latin)? 1: (
                input.match(reg_width)? 0: -1
            )
        }
        let E_WIDTH = (input, range = 0xFEE0) => {
            let regular = /[\x20\x21-\x7E]/g
            
            return input.replace(regular, ch => ch.codePointAt(0) === 0x20
                ?   String.fromCodePoint(0x3000)
                :   String.fromCodePoint(ch.codePointAt(0) + range)
            )
        }
        let E_ASCII = (input, range = 0xFEE0) => {
            let regular = /[\uFF01-\uFF5E]/g
            
            return input.replace(regular, ch => ch.codePointAt(0) === 0x3000
                ?   String.fromCodePoint(0x20)
                :   String.fromCodePoint(ch.codePointAt(0) - range)
            )
        }
        let EVENT = (event) => {
            let ch = /[a-z]/.test(event.key)
            ?   event.key.toUpperCase()
            :   event.key.toLowerCase()
            
            if (E_EITHER(ch)) {
                let node = event.target
                let is_supported_type = node instanceof HTMLTextAreaElement
                ||  node instanceof HTMLInputElement
                let is_modifier = (event.ctrlKey && !event.altKey)
                let is_capslock = event.getModifierState("CapsLock")
                
                if (is_capslock && is_supported_type && !is_modifier) {
                    let swap = E_WHICH(ch)
                    let result = swap === 1? E_WIDTH(ch):(swap === -1? E_ASCII(ch):ch)
                    
                    event.preventDefault()
                    event.target.value += result
                }
            }
        }
        
        return class {
            getName () {return "Aesthetics"}
            getDescription() {return "Need I say more?<br/><br/>Toggle capslock to switch between *width/latin input."}
            getVersion () {return "0.1.8"}
            getAuthor () {return "Cihparg"}
            
            load () {}
            unload () {}
            start () {document.addEventListener("keydown", EVENT)}
            stop () {document.removeEventListener("keydown", EVENT)}
            
            getSettingsPanel () {return "<h1>Nothing here.</h1>"}
        }
    })()

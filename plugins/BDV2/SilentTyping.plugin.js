/**
  * @name SilentTyping
  */
module.exports = class {
    load () {
        this.hook = BdApi.findModuleByProps("startTyping")
    }
    start () {
        if (!this.restore)
            this.restore = BdApi.monkeyPatch(this.hook, "startTyping", {
                instead () {}
            })
    }
    stop () {
        if (this.restore)
            this.restore()
    }
} 

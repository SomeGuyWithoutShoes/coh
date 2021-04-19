/**
  * @name isDeveloper
  * @credit https://gist.github.com/MPThLee/3ccb554b9d882abc6313330e38e5dfaa
  */
module.exports = class {
    load () {}
    start () {
        Object.defineProperty(
            BdApi.findModuleByProps("isDeveloper"),
            "isDeveloper",
            {get: flag => !0, set: flag => flag, configurable: true}
        )
    }
    stop () {}
}

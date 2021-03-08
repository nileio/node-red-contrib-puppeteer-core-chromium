const puppeteer = require('puppeteer-core')


module.exports = function (RED) {
  function PuppeteerBrowserLaunch (config) {
    RED.nodes.createNode(this, config)
    this.headless = (config.headless == "1" ? true : false)
    this.slowMo = config.slowMo
    this.name = config.name
    this.executablePath = config.executablePath
    var node = this

    // Retrieve the config node
    this.on('input', function (msg) {
      puppeteer.launch( { args: ['--no-sandbox', '--disable-setuid-sandbox'], executablePath: node.executablePath, headless: node.headless, slowMo: node.slowMo} )
        .then((browser) => {
          msg.puppeteer = {
            browser
          }
          node.send(msg)
        })
    })
    oneditprepare: function oneditprepare() {
      $("#node-input-headless").val(this.headless === true ? "1" : "0")
      $("#node-input-slowMo").val(this.slowMo)
      $("#node-input-name").val(this.name)
      $("#node-input-executablePath").val(this.executablePath)
    }
  }
  RED.nodes.registerType('puppeteer-browser-launch', PuppeteerBrowserLaunch)
}

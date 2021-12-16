module.exports = function (RED) {
  function PuppeteerPageKeyboardType(config) {
    RED.nodes.createNode(this, config);
    // Retrieve the config node
    this.text = config.text;
    this.textType = config.textType || "str";
    var node = this;
    this.on("input", function (msg) {
      let text = node.text;
      if (node.textType === "msg") text = RED.util.getMessageProperty(msg, node.text);
      if (node.textType === "jsonata") text = RED.util.evaluateJSONataExpression(RED.util.prepareJSONataExpression(node.text, node), msg);

      msg.puppeteer.page.keyboard.type(text).then(() => {
        node.send(msg);
      });
    });
  }
  RED.nodes.registerType("puppeteer-page-keyboard-type", PuppeteerPageKeyboardType);
};

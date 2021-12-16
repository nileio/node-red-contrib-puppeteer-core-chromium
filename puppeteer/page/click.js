module.exports = function (RED) {
  function PuppeteerPageClick(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.selectorType = config.selectorType || "str";

    var node = this;

    // Retrieve the config node
    this.on("input", function (msg) {
      let selector = node.selector;
      if (node.selectorType === "msg") selector = RED.util.getMessageProperty(msg, node.selector);
      if (node.selectorType === "jsonata") selector = RED.util.evaluateJSONataExpression(RED.util.prepareJSONataExpression(node.selector, node), msg);
      msg.puppeteer.page
        .click(selector)
        .then(() => {
          node.send(msg);
        })
        .catch((err) => {
          node.error(err);
        });
    });
  }
  RED.nodes.registerType("puppeteer-page-click", PuppeteerPageClick);
};

module.exports = function (RED) {
  function PuppeteerPageWaitFor(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.selectorType = config.selectorType || "str";
    this.timeoutUnits = config.timeoutUnits;
    if (config.timeout === 0) {
      //disable timeout - no timeout.
      this.timeout = 0;
    } else if (config.timeoutUnits === "milliseconds") {
      this.timeout = config.timeout;
    } else if (config.timeoutUnits === "minutes") {
      this.timeout = config.timeout * (60 * 1000);
    } else if (config.timeoutUnits === "seconds") {
      // Default to seconds
      this.timeout = config.timeout * 1000;
    } else this.timeout = 30000;

    var node = this;

    // Retrieve the config node
    this.on("input", function (msg) {
      let selector = node.selector;
      if (node.selectorType === "msg") selector = RED.util.getMessageProperty(msg, node.selector);
      if (node.selectorType === "jsonata") selector = RED.util.evaluateJSONataExpression(RED.util.prepareJSONataExpression(node.selector, node), msg);
      msg.puppeteer.page
        .waitForSelector(selector, {timeout: node.timeout})
        .then(() => {
          node.send(msg);
        })
        .catch((err) => {
          node.error(err);
        });
    });
  }
  RED.nodes.registerType("puppeteer-page-waitFor", PuppeteerPageWaitFor);
};

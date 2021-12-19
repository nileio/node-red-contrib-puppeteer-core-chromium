module.exports = function (RED) {
  function PuppeteerPageGoto(config) {
    RED.nodes.createNode(this, config);
    // Retrieve the config node
    this.url = config.url;
    this.urlType = config.urlType || "str";
    var node = this;

    this.on("input", function (msg) {
      let goToUrl = node.url;
      if (node.urlType === "msg") goToUrl = RED.util.getMessageProperty(msg, node.url);
      if (node.urlType === "jsonata") goToUrl = RED.util.evaluateJSONataExpression(RED.util.prepareJSONataExpression(node.url, node), msg);
      node.warn(`puppeteer goto url: ${goToUrl}`);
      msg.puppeteer.page
        .goto(goToUrl)
        .then(() => {
          node.send(msg);
        })
        .catch((err) => {
          node.error(err);
        });
    });
  }
  RED.nodes.registerType("puppeteer-page-goto", PuppeteerPageGoto);
};

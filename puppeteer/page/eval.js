module.exports = function (RED) {
  function PuppeteerPageEval(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.function = config.function;
    var node = this;

    // Retrieve the config node
    this.on("input", function (msg) {
      msg.puppeteer.page
        .$eval(node.selector, node.function)
        .then((result) => {
          msg.payload = result;
          node.send(msg);
        })
        .catch((err) => {
          node.error(err);
        });
    });
  }
  RED.nodes.registerType("puppeteer-page-eval", PuppeteerPageEval);
};

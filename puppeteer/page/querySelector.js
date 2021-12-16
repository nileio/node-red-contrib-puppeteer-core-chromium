module.exports = function (RED) {
  function PuppeteerDocumentQuerySelector(config) {
    RED.nodes.createNode(this, config);
    this.selector = config.selector;
    this.selectorType = config.selectorType || "str";
    this.property = config.property;
    var node = this;

    // Retrieve the config node
    this.on("input", function (msg) {
      let selector = node.selector;
      if (node.selectorType === "msg") selector = RED.util.getMessageProperty(msg, node.selector);
      if (node.selectorType === "jsonata") selector = RED.util.evaluateJSONataExpression(RED.util.prepareJSONataExpression(node.selector, node), msg);
      //const selector = "a";
      //const property = "innerText";
      msg.puppeteer.page
        .evaluate(
          ({selector, property}) => {
            return document.querySelector(selector)[property];
          },
          {
            selector: selector,
            property: this.property,
          }
        )
        .then((payload) => {
          msg.payload = payload;
          node.send(msg);
        });
    });
  }
  RED.nodes.registerType("puppeteer-page-document-querySelector", PuppeteerDocumentQuerySelector);
};

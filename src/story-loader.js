const loaderUtils = require("loader-utils");
const serialize = require("serialize-javascript");

module.exports = function(source) {
  const story = generateCode(source, this);
  this.callback(null, `module.exports = ${story}`);
};

function generateCode(source, ctx) {
  let code = "";
  const story = {
    template: source.trim(),
    name: loaderUtils.parseQuery(ctx.resourceQuery).name || "",
    group: loaderUtils.parseQuery(ctx.resourceQuery).group || "Stories",
    methods: loaderUtils.parseQuery(ctx.resourceQuery).methods,
    notes: loaderUtils.parseQuery(ctx.resourceQuery).notes,
    knobs: loaderUtils.parseQuery(ctx.resourceQuery).knobs
  };

  code += `function (Component) {
    Component.options.__stories = Component.options.__stories || []
    Component.options.__stories.push(${serialize(story)})
  }\n`;
  return code;
}

const envOptions = {
  targets: {
    node: "current",
  },
  useBuiltIns: "usage",
  bugfixes: true,
  corejs: {
    version: 3,
    proposals: true,
  },
};

const aliasOptions = {
  root: ["./src"],
  alias: {
    src: "./src",
  },
};

module.exports = {
  presets: [
    ["@babel/preset-typescript"],
    ["@babel/preset-env", envOptions],
  ],
  plugins: [
    ["module-resolver", aliasOptions],
    ["@babel/plugin-proposal-decorators", { "version": "legacy" }],
    ["@babel/plugin-transform-class-properties", { "loose": true }],
  ],
};

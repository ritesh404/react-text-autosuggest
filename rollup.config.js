import babel from "rollup-plugin-babel";
import babelrc from "babelrc-rollup";

const plugins = [
  babel(
    babelrc({
      addExternalHelpersPlugin: false,
      exclude: /node_modules/,
      runtimeHelpers: false
    })
  )
];

const pkg = require("./package.json");
const external = Object.keys(pkg.dependencies);
const globals = {
  "prop-types": "PropTypes",
  ramda: "R",
  react: "React",
  "react-dom": "ReactDom"
};

export default {
  input: "src/AutoSuggest.js",
  plugins,
  external,
  output: [
    {
      file: "dist/autosuggest.iife.js",
      format: "iife",
      sourcemap: true,
      globals,
      name: "AutoSuggest"
    },
    {
      file: pkg.main,
      format: "umd",
      sourcemap: true,
      globals,
      name: "AutoSuggest"
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
      globals,
      name: "AutoSuggest"
    }
  ]
};

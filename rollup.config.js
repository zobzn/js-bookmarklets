import { terser } from "rollup-plugin-terser";
import glob from "glob";

const inputs = glob.sync("./src/*.js");

export default inputs.map(input => ({
  input,
  output: {
    dir: __dirname + "/res",
    format: "iife"
  },
  plugins: [terser()]
}));

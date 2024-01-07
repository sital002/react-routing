import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "@rollup/plugin-babel";
export default {
  input: "./lib/index.ts",
  output: {
    file: "./dist/index.js",
    format: "esm",
  },

  plugins: [
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "tsconfig.json",
    }),
    babel({ babelHelpers: "bundled" }),
  ],
  external: ["react", "react-dom"],
};

import typescript from "rollup-plugin-typescript2";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
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
  ],
  external: ["react", "react-dom"],
};

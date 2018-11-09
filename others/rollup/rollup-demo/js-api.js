const rollup = require("rollup");

const inputOptions = {
  input: "./main.js"
};
const outputOptions = {
  file: "./distR/bundle-js.js",
  format: "iife",
  name: "zxb"
};

async function build() {
  // create a bundle
  const bundle = await rollup.rollup(inputOptions);

  console.log(bundle.imports); // an array of external dependencies
  console.log(bundle.exports); // an array of names exported by the entry point
  console.log(bundle.modules); // an array of module objects

  // generate code and a sourcemap
  const { code, map } = await bundle.generate(outputOptions);

  // or write the bundle to disk
  await bundle.write(outputOptions);
}

build();

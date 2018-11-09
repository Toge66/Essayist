const path = require("path");

module.exports = {
  entry: {
    app: "./main-require.js"
  },
  output: {
    filename: "bundle-require.js",
    path: path.resolve(__dirname, "distW")
  }
};

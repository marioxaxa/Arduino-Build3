const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
module.exports = {

resolve: {
    fallback: {
        "zlib": require.resolve("browserify-zlib"),
        "stream": require.resolve("stream-browserify"),
        "path": require.resolve("path-browserify"),
        "constants": require.resolve("constants-browserify"),
        "decompress": require.resolve("decompress"),
        "fs": require.resolve("fs")
    }
},
// Other rules like entry, output, devserver....,
plugins: [
    new NodePolyfillPlugin()
]}
var path = require("path");
var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var webpackCfg = require("../config/webpack.config.dev.js");

var compiler = webpack(webpackCfg);

//init server
var app = new webpackDevServer(compiler, {
    //注意此处publicPath必填
    publicPath: webpackCfg.output.path,
    stats: {
      colors: true
    },
});
app.use(require("webpack-dev-middleware")(compiler, {
    noInfo: true, publicPath: webpackCfg.output.path
}));

app.listen(8080, "localhost", function (err) {
    if (err) {
        console.log(err);
    }
});

console.log("listen at http://localhost:8080");
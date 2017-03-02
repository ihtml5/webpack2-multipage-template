function importAssets(options) {
this.options = options;
}

importAssets.prototype.apply = function(compiler) {
    var paths = this.options.paths;
    compiler.plugin('compilation', function(compilation, options) {
        compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
            if (paths['js'] && paths['js'].length>0) {
                for (var i = paths['js'].length - 1; i >= 0; i--) {
                    htmlPluginData.assets.js.unshift(paths['js'][i]);
                    console.log(htmlPluginData.assets);
                }
            }
            if (paths['css'] && paths['css'].length>0) {
                for (var j = paths['css'].length-1; j>=0;j--) {
                    htmlPluginData.assets.css.unshift(paths['css'][j]);
                }
            }
            callback(null, htmlPluginData);
        });
    });
};

module.exports = importAssets;
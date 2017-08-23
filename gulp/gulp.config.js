module.exports = function (fs) {
    var path = require('path'),
        glob = require('glob'),
        baseUrl = path.resolve(__dirname, '..'),
        moduleList = fs.readdirSync( baseUrl + '/src/modules/' ),
        config = {
            baseUrl: baseUrl,
            pnglevel: 2,
            moduleInfo: {}
        };

    // 分析moduleList下页面配置并同步moduleInfo
    moduleList.forEach(function(itemModule, indexModule){
        var pageInfo = glob.sync( baseUrl + '/src/modules/' + itemModule + '/views/**/**.json');
        config.moduleInfo[itemModule] = [];
        pageInfo.forEach(function(itemInfo, indexInfo){
            var info = require(itemInfo);
            // 分析libs依赖
            info.libDeps.forEach(function(itemDep, indexDep){

            });

            config.moduleInfo[itemModule].push(info);
        });
    });

    return config;
};
var fs = require('fs'),
    config = require('../gulp.config')(fs),
    readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    moduleInfo = {
        module: 'demo',
        page: 'demo',
        type: "page",
        description: "",
        version: "0.0.1",
        author: "",
        contributors: [
            {
                name: "",
                email: ""
            }
        ],
        spriteDeps: [],
        widgetDeps: [],
        libDeps: [],
        cssDeps: []
    };
rl.setPrompt('模块名称: (demo) ');
rl.prompt();
rl.on('line', function( line ) {
    switch(rl._prompt) {
        case '模块名称: (demo) ':
            moduleInfo.module = line || moduleInfo.module;
            rl.setPrompt('页面名称: (demo) ');
            rl.prompt();
            break;
        case '页面名称: (demo) ':
            moduleInfo.page = line;
            var modulesPath = config.baseUrl + '/src/modules/',
                modulePath = modulesPath + '/' + moduleInfo.module;
            if(fs.existsSync(modulePath)){
                console.log('该模块已存在！');
            }else{
                console.log('正在创建...');
                var moduleViewsPath = modulePath + '/views',
                    moduleViewsJsonPath = modulePath + '/views/module-config.json',
                    moduleViewsLessPath = modulePath + '/views/' + moduleInfo.page + '.less',
                    moduleViewsHtmlPath = modulePath + '/views/' + moduleInfo.page + '.html',
                    moduleViewsPhtmlPath = modulePath + '/views/' + moduleInfo.page + '.phtml',
                    moduleViewsJsPath = modulePath + '/views/' + moduleInfo.page + '.js';
                fs.mkdirSync(modulePath);
                fs.mkdirSync(moduleViewsPath);
                fs.writeFileSync(moduleViewsJsonPath, JSON.stringify(moduleInfo, null, 4));
                fs.writeFileSync(moduleViewsLessPath, fs.readFileSync(config.baseUrl + '/gulp/template/tpl-module.less'));
                fs.writeFileSync(moduleViewsHtmlPath, fs.readFileSync(config.baseUrl + '/gulp/template/tpl-module.html'));
                fs.writeFileSync(moduleViewsPhtmlPath, fs.readFileSync(config.baseUrl + '/gulp/template/tpl-module.phtml'));
                fs.writeFileSync(moduleViewsJsPath, fs.readFileSync(config.baseUrl + '/gulp/template/tpl-module.js'));
                console.log('创建成功');
            }
            rl.close();
            break;
        default:
            rl.close();
            break;
    }
});

rl.on('close', function() {
    process.exit(0);
});

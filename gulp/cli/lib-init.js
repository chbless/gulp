var fs = require('fs'),
    config = require('../gulp.config')(fs),
    readline = require('readline'),
    rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    }),
    libInfo = {
        name: 'kfz-demo',
        type: "lib",
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
rl.setPrompt('组件名称: (kfz-demo) ');
rl.prompt();
rl.on('line', function( line ) {
    switch(rl._prompt) {
        case '组件名称: (kfz-demo) ':
            libInfo.name = line || libInfo.name;
            var libsPath = config.baseUrl + '/src/test/',
                libPath = libsPath + libInfo.name;
            if(fs.existsSync(libPath)){
                console.log('该模块已存在！');
            }else{
                console.log('正在创建...');
                var libSrcPath = libPath + '/src',
                    libSkinPath = libPath + '/static';
                fs.mkdirSync(libPath);
                fs.mkdirSync(libSrcPath);
                fs.mkdirSync(libSkinPath);
                fs.writeFileSync(libPath + '/lib-config.json', JSON.stringify(libInfo, null, 4));
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

/* eslint valid-jsdoc: "off" */

"use strict";

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = (appInfo) => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = (exports = {});

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + "_1675842542640_9719";

    // add your middleware config here
    config.middleware = [];

    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true,
        },
        domainWhiteList: ["*"], // 配置白名单
    };

    config.view = {
        mapping: { ".html": "ejs" },
    };

    config.jwt = {
        secret: "kahoohak",
    };

    config.multipart = {
        mode: "file",
    };

    config.cors = {
        origin: "*",
        credentials: true,
        allowMethods: "GET,POST,PUT,DELETE,HEAD,PATCH",
    };

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
        uploadDir: "app/public/upload",
    };

    exports.mysql = {
        client: {
            host: "localhost",
            port: "3306",
            user: "root",
            database: "book-keeping-book",
        },
        app: true,
        agent: false,
    };

    return {
        ...config,
        ...userConfig,
    };
};

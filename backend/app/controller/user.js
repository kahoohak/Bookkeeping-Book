"use strict";

const { Controller } = require("egg");

class UserController extends Controller {
    async register() {
        const { ctx } = this;
        const { username, password } = ctx.request.body;

        if (!username || !password) {
            ctx.body = {
                code: 500,
                msg: "账号或者密码不能为空",
                data: null,
            };
            return;
        }

        const userInfo = await ctx.service.user.getUserByName(username);

        if (userInfo && userInfo.id) {
            ctx.body = {
                code: 500,
                msg: "账号名已被注册，请重新输入",
                data: null,
            };
            return;
        }

        const default_avatar = "http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png";

        const result = await ctx.service.user.register({
            username,
            password,
            avatar: default_avatar,
            create_time: Math.floor(Date.now() / 1000),
        });

        if (result) {
            ctx.body = {
                code: 200,
                msg: "注册成功",
                data: null,
            };
        } else {
            ctx.body = {
                code: 500,
                msg: "注册失败",
                data: null,
            };
        }
    }

    async login() {
        const { ctx, app } = this;
        const { username, password } = ctx.request.body;

        const userInfo = await ctx.service.user.getUserByName(username);

        if (!userInfo || !userInfo.id) {
            ctx.body = {
                code: 500,
                msg: "账号不存在",
                data: null,
            };
            return;
        }

        if (userInfo && password !== userInfo.password) {
            ctx.body = {
                code: 500,
                msg: "账号密码错误",
                data: null,
            };
            return;
        }

        const token = app.jwt.sign(
            {
                id: userInfo.id,
                username: userInfo.username,
                exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60,
            },
            app.config.jwt.secret
        );

        ctx.body = {
            code: 200,
            msg: "登录成功",
            data: { token },
        };
    }

    async test() {
        const { ctx, app } = this;
        const token = ctx.request.header.authorization;
        try {
            const decode = app.jwt.verify(token, app.config.jwt.secret);

            ctx.body = {
                code: 200,
                msg: "获取成功",
                data: { ...decode },
            };
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: "获取失败",
                data: null,
            };
        }
    }

    async getUserInfo() {
        const { ctx, app } = this;
        const token = ctx.request.header.authorization;
        const decode = app.jwt.verify(token, app.config.jwt.secret);

        const userInfo = await ctx.service.user.getUserByName(decode.username);

        ctx.body = {
            code: 200,
            msg: "获取成功",
            data: {
                id: userInfo.id,
                username: userInfo.username,
                avatar: userInfo.avatar,
                signature: userInfo.signature,
            },
        };
    }

    async editUserInfo() {
        const { ctx, app } = this;
        const { signature = "" } = ctx.request.body;

        try {
            const token = ctx.request.header.authorization;
            const decode = app.jwt.verify(token, app.config.jwt.secret);
            const userInfo = await ctx.service.user.getUserByName(decode.username);
            const result = await ctx.service.user.editUserInfo({ ...userInfo, signature });

            ctx.body = {
                code: 200,
                msg: "编辑成功",
                data: null,
            };
        } catch (error) {
            ctx.body = {
                code: 500,
                msg: "编辑失败",
                data: null,
            };
        }
    }
}

module.exports = UserController;

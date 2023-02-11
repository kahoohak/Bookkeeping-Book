"use strict";

module.exports = (secret) => {
    return async function jwtErr(ctx, next) {
        const token = ctx.request.header.authorization;
        let decode;
        if (token && token !== "null") {
            try {
                decode = ctx.app.jwt.verify(token, secret);
                await next();
            } catch (error) {
                ctx.status = 200;
                ctx.body = {
                    code: 401,
                    msg: "token过期，请重新登录",
                };
                return;
            }
        } else {
            ctx.status = 200;
            ctx.body = {
                code: 401,
                msg: "token不存在",
            };
            return;
        }
    };
};

"use strict";

const { Controller } = require("egg");

class HomeController extends Controller {
    async index() {
        const { ctx } = this;
        await ctx.render('index.html', {
          title: 'kahoohak'
        })
    }

    async user() {
        const { ctx } = this;
        console.log("ctx.service", ctx.service);
        const { name } = await ctx.service.home.user();
        ctx.body = { name };
    }

    async add() {
        const { ctx } = this;
        const { title } = ctx.request.body;
        ctx.body = { title };
    }
}

module.exports = HomeController;

"use strict";

const fs = require('fs')
const moment = require('moment')
const mkdirp = require('mkdirp')
const path = require('path')

const { Controller } = require("egg");

class UploadController extends Controller {
    async upload() {
        const { ctx } = this
        console.log(ctx.request.files[0])

        ctx.body = {
            code: 200,
            msg: '上传ing'
        }
    }
}

module.exports = UploadController
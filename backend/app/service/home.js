"use strict";

const Service = require("egg").Service;

class HomeService extends Service {
    async user() {
        return {
            name: 'kahoohak'
        }
    }
}

module.exports = HomeService;

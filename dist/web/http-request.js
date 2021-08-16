"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = __importDefault(require("http"));
function httpRequest(host, path) {
    return new Promise(function (resolve, reject) {
        var data = '';
        var req = http_1.default.request({
            hostname: host,
            path: path,
            method: 'GET'
        }, function (res) {
            res.on('data', function (d) {
                data += d;
            });
            res.on('end', function () {
                resolve(data);
            });
        });
        req.on('error', function (error) {
            reject(error);
        });
        req.end();
    });
}
exports.default = httpRequest;

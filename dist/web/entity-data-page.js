"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_request_1 = __importDefault(require("./http-request"));
var JSDOM = require('jsdom').JSDOM;
var overrideNames = {
    4115: "Nihonium",
    9999: "Debug"
};
var EntityDataPage = /** @class */ (function () {
    function EntityDataPage(id) {
        this.name = undefined;
        this.information = undefined;
        this.is = undefined;
        this.are = undefined;
        this.id = id;
    }
    EntityDataPage.prototype.populate = function () {
        var _this = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var httpResponse, dom, tables, mainPage, dataTable, inheritanceTable, isTable, areTable;
            var _this = this;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, http_request_1.default('chemthes.com', '/entity_datapage.php?id=' + this.id)];
                    case 1:
                        httpResponse = _b.sent();
                        dom = new JSDOM(httpResponse);
                        tables = [];
                        mainPage = dom.window.document.querySelector(".main_page");
                        if (mainPage === null)
                            return [2 /*return*/, reject('Page does not contain .main_page')];
                        mainPage.childNodes.forEach(function (el) {
                            if (el.rows !== undefined)
                                tables.push(el);
                        });
                        dataTable = tables[0];
                        inheritanceTable = tables[1];
                        // Data
                        this.information = dataTable.rows[2].children[1].innerHTML.replace(/<table[\s\S]*<\/table>/g, '').replace(/<br>/g, '\n').trim();
                        if (this.information === 'undefined')
                            return [2 /*return*/, reject('Cannot find entity information')];
                        // Inheritance
                        this.name = (_a = overrideNames[this.id]) !== null && _a !== void 0 ? _a : inheritanceTable.rows[0].children[1].children[1].textContent.trim();
                        if (this.name === undefined)
                            return [2 /*return*/, reject('Cannot find entity name.')];
                        this.is = [];
                        isTable = inheritanceTable.rows[1].children[0].children[0];
                        if (isTable !== undefined) {
                            Array.from(isTable.rows).forEach(function (row) {
                                var _a, _b;
                                var id = parseInt(row.children[0].children[1].href.split('=')[1]);
                                if (!((_a = _this.is) === null || _a === void 0 ? void 0 : _a.includes(id)))
                                    (_b = _this.is) === null || _b === void 0 ? void 0 : _b.push(id);
                            });
                        }
                        this.are = [];
                        areTable = inheritanceTable.rows[1].children[1].children[0];
                        if (areTable !== undefined) {
                            Array.from(areTable.rows).forEach(function (row) {
                                var _a, _b;
                                var id = parseInt(row.children[0].children[1].href.split('=')[1]);
                                if (!((_a = _this.are) === null || _a === void 0 ? void 0 : _a.includes(id)))
                                    (_b = _this.are) === null || _b === void 0 ? void 0 : _b.push(id);
                            });
                        }
                        resolve();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    return EntityDataPage;
}());
exports.default = EntityDataPage;

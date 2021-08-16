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
var entity_data_page_1 = __importDefault(require("./entity-data-page"));
var product_ids_json_1 = __importDefault(require("../data/product-ids.json"));
var periodic_table_json_1 = __importDefault(require("../data/periodic-table.json"));
var fs_1 = require("fs");
function findProductData() {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function () {
        var output, i, _i, productIds_1, id, dataPage, color, boilingPoint, _e, _f, element, potentialBoilingPoints, entityData;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    output = {};
                    i = 0;
                    _i = 0, productIds_1 = product_ids_json_1.default;
                    _g.label = 1;
                case 1:
                    if (!(_i < productIds_1.length)) return [3 /*break*/, 4];
                    id = productIds_1[_i];
                    dataPage = new entity_data_page_1.default(id);
                    return [4 /*yield*/, dataPage.populate()];
                case 2:
                    _g.sent();
                    if (dataPage.name === undefined)
                        throw '"Name" has remained undefined.';
                    color = '';
                    boilingPoint = 2147483647;
                    for (_e = 0, _f = periodic_table_json_1.default.elements; _e < _f.length; _e++) {
                        element = _f[_e];
                        if (element.name.toLowerCase() === ((_a = dataPage.name) === null || _a === void 0 ? void 0 : _a.toLowerCase())) {
                            if (element["cpk-hex"] !== null) {
                                color = element["cpk-hex"];
                                break;
                            }
                        }
                    }
                    if (dataPage.information !== undefined) {
                        potentialBoilingPoints = dataPage.information.match(/Boiling point = (.*){1} °C/);
                        if (potentialBoilingPoints !== null) {
                            boilingPoint = parseFloat(potentialBoilingPoints[1]);
                        }
                    }
                    entityData = {
                        name: dataPage.name,
                        id: dataPage.id,
                        information: (_b = dataPage.information) !== null && _b !== void 0 ? _b : '',
                        color: color,
                        boilingPoint: boilingPoint,
                        is: (_c = dataPage.is) !== null && _c !== void 0 ? _c : [],
                        are: (_d = dataPage.are) !== null && _d !== void 0 ? _d : []
                    };
                    output[id] = entityData;
                    i++;
                    if (i % 100 === 0) {
                        console.log(i);
                    }
                    _g.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4:
                    fs_1.writeFileSync('../src/data/product-data.json', JSON.stringify(output));
                    return [2 /*return*/];
            }
        });
    });
}
exports.default = findProductData;

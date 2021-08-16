"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var calculate_reaction_1 = __importDefault(require("../local/calculate-reaction"));
var product_data_json_1 = __importDefault(require("../data/product-data.json"));
var element_ids_json_1 = __importDefault(require("../data/element-ids.json"));
var http_1 = __importDefault(require("http"));
var productData = product_data_json_1.default;
http_1.default.createServer(function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    if (req.url === undefined) {
        res.writeHead(404);
        res.end();
        return;
    }
    if (req.url.startsWith('/react/?r=')) {
        var reactantIds = decodeURI(req.url.split('?r=')[1]).trim().split(' ').map(function (s) { return parseInt(s); });
        var matchingReactions = calculate_reaction_1.default(reactantIds);
        res.writeHead(200);
        if (matchingReactions.length === 0)
            return res.end();
        var products = matchingReactions[Math.floor(Math.random() * matchingReactions.length)].r;
        if (products.length === 0)
            return res.end();
        return res.end(products.join(' '));
    }
    if (req.url.startsWith('/data/?e=')) {
        var entityId = parseInt(decodeURI(req.url.split('?e=')[1]));
        console.log(entityId);
        if (Object.keys(productData).includes(entityId.toString())) {
            res.writeHead(200);
            var entityData = productData[entityId];
            var response = entityData.name + "~" + entityData.boilingPoint + "~" + entityData.color + "~" + entityData.is.join('|');
            return res.end(response);
        }
    }
    if (req.url.startsWith('/root')) {
        return res.end(element_ids_json_1.default.join(' '));
    }
    res.writeHead(404);
    return res.end();
}).listen(process.env.PORT || 8080);
console.log("Listening in port " + (process.env.PORT || 8080));

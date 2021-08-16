"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var element_ids_json_1 = __importDefault(require("../data/element-ids.json"));
var fs_1 = require("fs");
var calculate_reaction_1 = __importDefault(require("./calculate-reaction"));
function calculateProducts() {
    var brandNewEntities = [-1];
    var reactedEntities = [];
    var newElementsOnLastPass = element_ids_json_1.default;
    var depth = 0;
    while (brandNewEntities.length !== 0) {
        brandNewEntities = [];
        reactedEntities.push.apply(reactedEntities, newElementsOnLastPass);
        reactedEntities.forEach(function (el1) {
            newElementsOnLastPass.forEach(function (el2) {
                var reactionResult = calculate_reaction_1.default([el1, el2]);
                if (reactionResult === [])
                    return;
                reactionResult.forEach(function (reaction) {
                    reaction.r.forEach(function (entity) {
                        if (reactedEntities.includes(entity) || brandNewEntities.includes(entity))
                            return;
                        brandNewEntities.push(entity);
                    });
                });
            });
        });
        newElementsOnLastPass = __spreadArray([], brandNewEntities);
        console.log('Depth: ' + depth++);
    }
    console.log(reactedEntities.length);
    fs_1.writeFileSync('../src/data/product-ids.json', JSON.stringify(reactedEntities));
}
exports.default = calculateProducts;

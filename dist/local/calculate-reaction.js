"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var reaction_ids_json_1 = __importDefault(require("../data/reaction-ids.json"));
function calculateReaction(reactants) {
    reactants.sort(function (a, b) { return a - b; });
    var matches = [];
    for (var _i = 0, _a = Object.values(reaction_ids_json_1.default); _i < _a.length; _i++) {
        var _reaction = _a[_i];
        var reaction = _reaction;
        if (reaction.l.length !== reactants.length)
            continue;
        var shouldContinue = false;
        for (var i = 0; i < reactants.length; i++) {
            if (reaction.l[i] !== reactants[i]) {
                shouldContinue = true;
                break;
            }
        }
        if (shouldContinue)
            continue;
        matches.push(reaction);
    }
    return matches;
}
exports.default = calculateReaction;

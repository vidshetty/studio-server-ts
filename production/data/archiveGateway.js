"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const songlist1_1 = __importDefault(require("./songlist1"));
const songlist2_1 = __importDefault(require("./songlist2"));
const final = (() => {
    const list = [];
    songlist1_1.default.forEach(each => list.push(each));
    songlist2_1.default.forEach(each => list.push(each));
    return list;
})();
exports.default = final;
// module.exports = { final, comingSoon: comingSoonAlbums[0] };
//# sourceMappingURL=archiveGateway.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search_trie = void 0;
const songlist1_1 = __importDefault(require("./songlist1"));
const songlist2_1 = __importDefault(require("./songlist2"));
const search_service_1 = require("../search-service");
const search_trie = new search_service_1.SearchTrie();
exports.search_trie = search_trie;
const callback = (list, set) => (each) => {
    if (each.Type === "Single") {
        const single = each;
        const { Album, AlbumArtist, Artist } = Object.assign(Object.assign({}, single), { Album: single.Album.toLowerCase(), AlbumArtist: single.AlbumArtist.toLowerCase(), Artist: single.Artist.toLowerCase() });
        if (!set.has(Album))
            search_trie.insert(Album);
        set.add(Album);
        AlbumArtist.split(", ").forEach(s => {
            if (!set.has(s))
                search_trie.insert(s);
            set.add(s);
        });
        Artist.split(", ").forEach(s => {
            if (!set.has(s))
                search_trie.insert(s);
            set.add(s);
        });
    }
    if (each.Type === "Album") {
        const album = each;
        const { Album, AlbumArtist, Tracks } = Object.assign(Object.assign({}, album), { Album: album.Album.toLowerCase(), AlbumArtist: album.AlbumArtist.toLowerCase() });
        if (!set.has(Album))
            search_trie.insert(Album);
        set.add(Album);
        AlbumArtist.split(", ").forEach(s => {
            if (!set.has(s))
                search_trie.insert(s);
            set.add(s);
        });
        Tracks.forEach(track => {
            const { Title, Artist } = Object.assign(Object.assign({}, track), { Title: track.Title.toLowerCase(), Artist: track.Artist.toLowerCase() });
            if (!set.has(Title))
                search_trie.insert(Title);
            set.add(Title);
            Artist.split(", ").forEach(s => {
                if (!set.has(s))
                    search_trie.insert(s);
                set.add(s);
            });
        });
    }
    list.push(each);
};
const final = (() => {
    const list = [];
    const set = new Set();
    songlist1_1.default.forEach(callback(list, set));
    songlist2_1.default.forEach(callback(list, set));
    return list;
})();
exports.default = final;
// module.exports = { final, comingSoon: comingSoonAlbums[0] };
//# sourceMappingURL=archiveGateway.js.map
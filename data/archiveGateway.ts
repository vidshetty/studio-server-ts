import songlist1 from "./songlist1";
import songlist2 from "./songlist2";
import { Album, AlbumList, Single } from "../helpers/interfaces";
import { SearchTrie } from "../search-service";

const search_trie: SearchTrie = new SearchTrie();



const callback = (list: AlbumList[], set: Set<String>) => (each: AlbumList) => {

    if (each.Type === "Single") {

        const single = each as Single;

        const { Album, AlbumArtist, Artist } = {
            ...single,
            Album: single.Album.toLowerCase(),
            AlbumArtist: single.AlbumArtist.toLowerCase(),
            Artist: single.Artist.toLowerCase()
        }

        if (!set.has(Album)) search_trie.insert(Album);
        set.add(Album);

        AlbumArtist.split(", ").forEach(s => {
            if (!set.has(s)) search_trie.insert(s);
            set.add(s);
        });

        Artist.split(", ").forEach(s => {
            if (!set.has(s)) search_trie.insert(s);
            set.add(s);
        });

    }

    if (each.Type === "Album") {

        const album = each as Album;

        const { Album, AlbumArtist, Tracks } = {
            ...album,
            Album: album.Album.toLowerCase(),
            AlbumArtist: album.AlbumArtist.toLowerCase()
        };

        if (!set.has(Album)) search_trie.insert(Album);
        set.add(Album);

        AlbumArtist.split(", ").forEach(s => {
            if (!set.has(s)) search_trie.insert(s);
            set.add(s);
        });

        Tracks.forEach(track => {

            const { Title, Artist } = {
                ...track,
                Title: track.Title.toLowerCase(),
                Artist: track.Artist.toLowerCase()
            };

            if (!set.has(Title)) search_trie.insert(Title);
            set.add(Title);

            Artist.split(", ").forEach(s => {
                if (!set.has(s)) search_trie.insert(s);
                set.add(s);
            });

        });
        
    }

    list.push(each);

};

const final: Readonly<AlbumList[]> = (() => {

    const list: AlbumList[] = [];
    const set: Set<String> = new Set();

    songlist1.forEach(callback(list,set));
    songlist2.forEach(callback(list,set));

    return list;

})();


export { search_trie };
export default final;
// module.exports = { final, comingSoon: comingSoonAlbums[0] };
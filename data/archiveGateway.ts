import songlist1 from "./songlist1";
import songlist2 from "./songlist2";
import { AlbumList } from "../helpers/interfaces";


const final: Readonly<AlbumList[]> = (() => {

    const list: AlbumList[] = [];

    songlist1.forEach(each => list.push(each));
    songlist2.forEach(each => list.push(each));

    return list;

})();


export default final;
// module.exports = { final, comingSoon: comingSoonAlbums[0] };
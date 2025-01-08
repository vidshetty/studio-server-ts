import { ObjectId } from "mongodb";



export interface AlbumSchema {
    _id: ObjectId;
    _albumId: ObjectId;
    Album: string;
    AlbumArtist: String;
    Year: string;
    Color: string;
    LightColor?: string;
    DarkColor?: string;
    releaseDate: string;
    Thumbnail: string;
    Type: "Album" | "Single";
};

export interface TracksSchema {
    _id: ObjectId;
    _albumId: ObjectId;
    _trackId: ObjectId;
    Title: string;
    Artist: string;
    url: string;
    Duration: string;
    lyrics?: boolean;
    sync?: boolean;
    streamCount: number;
};
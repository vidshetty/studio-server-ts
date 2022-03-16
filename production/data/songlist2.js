"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../helpers/utils");
const songlist = [
    {
        _albumId: "61271e9bfeea0f2ba0df73f9",
        _trackId: "61271e9bfeea0f2ba0df73f9",
        Album: 'Lose Yourself (From "8 Mile" Soundtrack)',
        AlbumArtist: "Eminem",
        Type: "Single",
        Year: "2005",
        Color: "rgba(16,48,88,1)",
        releaseDate: (0, utils_1.date)("06-12-2005"),
        Thumbnail: "https://lh3.googleusercontent.com/M3bE7uvxto_SLeAM0dVltklsikCiUxdh1-6oGlHd0x_6kuxd7pUgvjqjBJCdSc-7tSPuGo-7FGHaIOG_=w544-h544-l90-rj",
        Artist: "Eminem",
        Duration: "5: 26",
        url: `${utils_1.server[1]}/listen/Lose Yourself - Eminem`
    },
    {
        _albumId: "61246efa7686503104d13d1c",
        _trackId: "61246efa7686503104d13d1c",
        Album: "Lean On (feat. DJ Snake & MØ)",
        AlbumArtist: "Major Lazor, DJ Snake",
        Type: "Single",
        Year: "2015",
        // Color: "rgba(232,32,104,1)", //invalid
        Color: "rgba(0,171,129,255)",
        releaseDate: (0, utils_1.date)("27-11-2015"),
        Thumbnail: "https://lh3.googleusercontent.com/Tsrjm3acw1G2eHA8PvS8i98_U516ePzl0T0SwIiJsbGOT5xggjOq7dyNLkj-6CENp0GmmGCqwpizF4Gl=w544-h544-l90-rj",
        Artist: "Major Lazor, DJ Snake, MØ",
        Duration: "2: 56",
        url: `${utils_1.server[1]}/listen/Lean On - Major Lazer`
    },
    {
        _albumId: "611df1019c40143becf33159",
        Album: "Starboy",
        AlbumArtist: "The Weeknd",
        Type: "Album",
        Year: "2016",
        Color: "rgba(168,0,48,1)",
        releaseDate: (0, utils_1.date)("25-11-2016"),
        Thumbnail: "https://lh3.googleusercontent.com/dcxXIIlest09vnvKznWM9VWQXu1EL7lKxBzXGzwgmVjmMNBm1dEWT_0qn1xrEZYyKF_qRE1TLq8P_JY_mQ=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "611df10a766d9920447e2d8c",
                Title: "Starboy (feat. Daft Punk)",
                Artist: "The Weeknd, Daft Punk",
                Duration: "3: 51",
                url: `${utils_1.server[1]}/listen/Starboy - The Weeknd`
            }
        ]
    },
    {
        _albumId: "611d337b769a2d1e4029d6ae",
        Album: "The Eminem Show",
        AlbumArtist: "Eminem",
        Type: "Album",
        Year: "2002",
        Color: "rgba(96,24,24,1)",
        releaseDate: (0, utils_1.date)("26-05-2002"),
        Thumbnail: "https://lh3.googleusercontent.com/GJmbTYfaMrWuPSzhOAy7jGCQ70a2UN2-0moTq-uh_Prd73-Au51FDHhGteg543a7iBv1Y9SPm4huMSBS=w544-h544-s-l90-rj",
        Tracks: [
            {
                _trackId: "611d338324db6d19903c1ebf",
                Title: "Cleanin' Out My Closet",
                Artist: "Eminem",
                Duration: "4: 58",
                url: `${utils_1.server[1]}/listen/Cleanin' Out My Closet - Eminem`
            },
            {
                _trackId: "611d338be45afe278c384c2e",
                Title: "Without Me",
                Artist: "Eminem",
                Duration: "4: 50",
                url: `${utils_1.server[1]}/listen/Without Me - Eminem`
            },
            {
                _trackId: "611d338cba149d1d9003c4af",
                Title: "Superman",
                Artist: "Eminem",
                Duration: "5: 50",
                url: `${utils_1.server[1]}/listen/Superman - Eminem`
            },
            {
                _trackId: "611d338dce77222fc40c4eee",
                Title: "'Till I Collapse",
                Artist: "Eminem, Nate Dogg",
                Duration: "4: 57",
                url: `${utils_1.server[1]}/listen/'Till I Collapse - Eminem`
            }
        ]
    },
    {
        _albumId: "611d2dac16b5560a8cd99e15",
        _trackId: "611d2dac16b5560a8cd99e15",
        Album: "Dance Monkey",
        AlbumArtist: "Tones And I",
        Type: "Single",
        Year: "2019",
        Color: "rgba(8,48,64,1)",
        releaseDate: (0, utils_1.date)("17-10-2019"),
        Thumbnail: "https://lh3.googleusercontent.com/hDSzLR6UDLcfxL6Hl9k5kJ6KmDTOavpr-GSCPyKgZTlPZuFcbNFTBI8O9HJR_i-Ts_bGg6bn9-3AGSu1=w544-h544-l90-rj",
        Artist: "Tones And I",
        Duration: "3: 29",
        url: `${utils_1.server[1]}/listen/Dance Monkey - Tones And I`
    },
    {
        _albumId: "611b3e828758eb19dcb699f1",
        Album: "ASTROWORLD",
        AlbumArtist: "Travis Scott",
        Type: "Album",
        Year: "2018",
        Color: "rgba(48,112,168,1)",
        releaseDate: (0, utils_1.date)("03-08-2018"),
        Thumbnail: "https://lh3.googleusercontent.com/PSIZ9cf9hpESZwcSz2ylS5I-zIREqCSagxV-X4CJqefrE0sRCktRtFw-a7PlkLygmg7k1nZREKCaSzY=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "611b3e8f5c7979450835932d",
                Title: "STARGAZING",
                Artist: "Travis Scott",
                Duration: "4: 30",
                url: `${utils_1.server[0]}/listen/Stargazing - Travis Scott`
            },
            {
                _trackId: "611b3e9c573dba28d4f823de",
                Title: "SICKO MODE",
                Artist: "Travis Scott",
                Duration: "5: 12",
                url: `${utils_1.server[0]}/listen/Sicko Mode - Travis Scott`
            },
            {
                _trackId: "611b3ea209af6209c45d8be6",
                Title: "BUTTERFLY EFFECT",
                Artist: "Travis Scott",
                Duration: "3: 10",
                url: `${utils_1.server[0]}/listen/Butterfly Effect - Travis Scott`
            },
        ]
    },
    {
        _albumId: "611b3ea92d31335d2cd8d356",
        _trackId: "611b3ea92d31335d2cd8d356",
        Album: "HIGHEST IN THE ROOM",
        AlbumArtist: "Travis Scott",
        Type: "Single",
        Year: "2019",
        Color: "rgba(64,112,168,1)",
        releaseDate: (0, utils_1.date)("04-10-2019"),
        Thumbnail: "https://lh3.googleusercontent.com/R_ZGITXTLuvEMkaOwQez3i1ILBKF-ZnztKYZBwnmqxtsnbnPPVnx31W-E7ZBu7N6eUqRIMxL47k_K8FPeQ=w544-h544-l90-rj",
        Artist: "Travis Scott",
        Duration: "2: 57",
        url: `${utils_1.server[0]}/listen/Highest In The Room - Travis Scott`
    },
    {
        _albumId: "611b3eb7335b972bec61b670",
        Album: "Birds In The Trap Sing McKnight",
        AlbumArtist: "Travis Scott",
        Type: "Album",
        Year: "2016",
        Color: "rgba(184,72,64,1)",
        releaseDate: (0, utils_1.date)("16-09-2016"),
        Thumbnail: "https://lh3.googleusercontent.com/4KB4cS7i427tdsareLs5j10tifHVvmP6X3G4umnxCm8Ra9zkG1hYq0C7Lg-B-I-n1i8SP-heKzAKIQXw=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "611b3ebe9e627122b4712c50",
                Title: "goosebumps",
                Artist: "Travis Scott",
                Duration: "4: 03",
                url: `${utils_1.server[0]}/listen/Goosebumps - Travis Scott`
            }
        ]
    },
    {
        _albumId: "611a2c3948657104c4fc9d0a",
        _trackId: "611a2c3948657104c4fc9d0a",
        Album: "Aaraam",
        AlbumArtist: "Brodha V",
        Year: "2021",
        Color: "rgba(176,16,144,1)",
        Thumbnail: "https://lh3.googleusercontent.com/ktO2h94SCnKAKUFy0YTRUZ9cH9J__reKQFlYGPhlHcWbE8cKlOoNjCmxiXhQwwqm7d54SAAeJ9y1AwNZ=w544-h544-l90-rj",
        url: `${utils_1.server[0]}/listen/Aaraam - Brodha V`,
        Duration: "2: 40",
        Artist: "Brodha V",
        Type: "Single",
        releaseDate: (0, utils_1.date)("18-02-2021")
    },
    {
        _albumId: "611a2c46b0eb3f5970d83c74",
        _trackId: "611a2c46b0eb3f5970d83c74",
        Album: "Flex",
        AlbumArtist: "Brodha V",
        Year: "2020",
        Color: "rgba(216,88,16,1)",
        Thumbnail: "https://lh3.googleusercontent.com/RON9AQkHYwP-WNUgLr-x0gm-kpM2Jpcc9oy88s2rnPVc2yI2C4oq1cdm7DsrXwtEf5EFxsJ5anaqWmM=w544-h544-l90-rj",
        url: `${utils_1.server[0]}/listen/Flex - Brodha V`,
        Duration: "2: 50",
        Artist: "Brodha V",
        Type: "Single",
        releaseDate: (0, utils_1.date)("08-12-2020")
    },
    {
        _albumId: "610ec10c7634aa50dcf7aec8",
        Album: "Gully Boy (Original Motion Picture Soundtrack)",
        AlbumArtist: "Various Artists",
        Type: "Album",
        Year: "2019",
        Color: "rgba(72,16,16,1)",
        releaseDate: (0, utils_1.date)("24-01-2019"),
        Thumbnail: "https://lh3.googleusercontent.com/bog_Soo6xEIBnsOgBdpeFcegIEuyp9XMhxKnFH7PfQxIeJNR0l2uq40yQrmC9dIkY06mnJQc4ugFn9c=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "610ec11793eb293dac7005b2",
                Title: "Asli Hip Hop",
                Artist: "Ranveer Singh, Spitfire, D-Cypher, BeatRAW",
                Duration: "1: 48",
                url: `${utils_1.server[0]}/listen/Asli Hip Hop - Gully Boy`
            },
            {
                _trackId: "610ec11ea5ad2848f825d380",
                Title: "Mere Gully Mein",
                Artist: "Ranveer Singh, DIVINE, Naezy, Sez on the Beat",
                Duration: "3: 05",
                url: `${utils_1.server[0]}/listen/Mere Gully Mein - Gully Boy`
            },
            {
                _trackId: "610ec127094dd359e848ddf5",
                Title: "Doori Poem",
                Artist: "Ranveer Singh, Rishi Rich",
                Duration: "1: 05",
                url: `${utils_1.server[0]}/listen/Doori Poem - Gully Boy`
            },
            {
                _trackId: "610ec1333e45ec3df8947da4",
                Title: "Doori",
                Artist: "Ranveer Singh, Rishi Rich",
                Duration: "2: 15",
                url: `${utils_1.server[0]}/listen/Doori - Gully Boy`
            },
            {
                _trackId: "610ec13ee9ffd22068414dab",
                Title: "Sher Aaya Sher",
                Artist: "DIVINE, Major C",
                Duration: "2: 14",
                url: `${utils_1.server[0]}/listen/Sher Aaya Sher - Gully Boy`
            },
            {
                _trackId: "610ec14ae0bbe4553482dec3",
                Title: "Azadi",
                Artist: "Dub Sharma, DIVINE",
                Duration: "2: 35",
                url: `${utils_1.server[0]}/listen/Azadi - Gully Boy`
            },
            {
                _trackId: "610ec156ea6a66257ccb6503",
                Title: "Kab Se Kab Tak",
                Artist: "Ranveer Singh, Vibha Saraf, Ankur Tewari, Karsh Kale, Kaam Bhaari",
                Duration: "3: 33",
                url: `${utils_1.server[0]}/listen/Kab Se Kab Tak - Gully Boy`
            },
            {
                _trackId: "610ec15f0422e04ac85d9f36",
                Title: "Kaam Bhaari",
                Artist: "Kaam Bhaari, Ankur Tewari",
                Duration: "2: 18",
                url: `${utils_1.server[0]}/listen/Kaam Bhaari - Gully Boy`
            },
            {
                _trackId: "610ec16813a38d186894c916",
                Title: "Apna Time Aayega",
                Artist: "Ranveer Singh, Dub Sharma, DIVINE",
                Duration: "2: 20",
                url: `${utils_1.server[0]}/listen/Apna Time Aayega - Gully Boy`
            }
        ]
    },
    {
        _albumId: "610f673b7c62ab0708ead3e7",
        Album: "Kamikaze",
        AlbumArtist: "Eminem",
        Type: "Album",
        Year: "2018",
        Color: "rgba(152,152,152,1)",
        releaseDate: (0, utils_1.date)("31-08-2018"),
        Thumbnail: "https://lh3.googleusercontent.com/JS6MK7XawzUUeCq-ANPfjk2BvkRnz5lblyK59uOhV9lmYSNdlZJx3KUQ6eF2CC7gjKOPO4Rq8tMPO2g=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "610f67479ede7941e81513db",
                Title: "The Ringer",
                Artist: "Eminem",
                Duration: "5: 37",
                lyrics: true,
                sync: true,
                url: `${utils_1.server[0]}/listen/The Ringer - Kamikaze`
            },
            // {
            //     _trackId: "610f674c76267d377caae88a",
            //     Title: "Greatest",
            //     Artist: "Eminem",
            //     Duration: "3: 47",
            //     url: `${server[0]}/listen/Greatest - Kamikaze`
            // },
            {
                _trackId: "610f675998d3030f481e0d7e",
                Title: "Lucky You (feat. Joyner Lucas)",
                Artist: "Eminem, Joyner Lucas",
                Duration: "4: 04",
                lyrics: true,
                sync: true,
                url: `${utils_1.server[0]}/listen/Lucky You - Kamikaze`
            },
            // {
            //     _trackId: "610f676068dc3b54f86ff853",
            //     Title: "Paul (Skit)",
            //     Artist: "Paul Rosenberg",
            //     Duration: "0: 35",
            //     url: `${server[0]}/listen/Paul (Skit) - Kamikaze`
            // },
            // {
            //     _trackId: "610f67665a088a0bcc445980",
            //     Title: "Normal",
            //     Artist: "Eminem",
            //     Duration: "3: 42",
            //     url: `${server[0]}/listen/Normal - Kamikaze`
            // },
            // {
            //     _trackId: "610f676e9de07f1d28be542e",
            //     Title: "Em Calls Paul (Skit)",
            //     Artist: "Eminem",
            //     Duration: "0: 49",
            //     url: `${server[0]}/listen/Em Calls Paul (Skit) - Kamikaze`
            // },
            // {
            //     _trackId: "610f67754437081204cb001a",
            //     Title: "Stepping Stone",
            //     Artist: "Eminem",
            //     Duration: "5: 09",
            //     url: `${server[0]}/listen/Stepping Stone - Kamikaze`
            // },
            {
                _trackId: "610f677b37668527a4fc3426",
                Title: `Not Alike (feat. Royce Da 5'9")`,
                Artist: `Eminem, Royce Da 5'9"`,
                Duration: "4: 48",
                url: `${utils_1.server[0]}/listen/Not Alike - Kamikaze`
            },
            {
                _trackId: "610f67848a657559b0ea2593",
                Title: "Kamikaze",
                Artist: "Eminem",
                Duration: "3: 36",
                url: `${utils_1.server[0]}/listen/Kamikaze - Kamikaze`
            },
            {
                _trackId: "610f678be003651ddcdd96cd",
                Title: "Fall",
                Artist: "Eminem",
                Duration: "4: 22",
                lyrics: true,
                sync: true,
                url: `${utils_1.server[0]}/listen/Fall - Kamikaze`
            },
            // {
            //     _trackId: "610f67917fc88d2528a9ab32",
            //     Title: "Nice Guy (feat. Jessie Reyez)",
            //     Artist: "Eminem, Jessie Reyez",
            //     Duration: "2: 30",
            //     url: `${server[0]}/listen/Nice Guy - Kamikaze`
            // },
            // {
            //     _trackId: "610f67995ef7ba461064517f",
            //     Title: "Good Guy (feat. Jessie Reyez)",
            //     Artist: "Eminem, Jessie Reyez",
            //     Duration: "2: 22",
            //     url: `${server[0]}/listen/Good Guy - Kamikaze`
            // },
            {
                _trackId: "610f67a03d695824347830f7",
                Title: "Venom (Music From The Motion Picture)",
                Artist: "Eminem",
                Duration: "4: 29",
                url: `${utils_1.server[0]}/listen/Venom - Kamikaze`
            }
        ]
    },
    {
        _albumId: "6110a11b90ca902e1c9a7b11",
        _trackId: "6110a11b90ca902e1c9a7b11",
        Album: 'Kiston (From "Roohi")',
        AlbumArtist: "Sachin-Jigar",
        Year: "2021",
        Color: "rgba(48,56,40,1)",
        Thumbnail: "https://lh3.googleusercontent.com/lfLkvc3yaTn-Sh3hDnOtXzzp4dBQ9NnAS4X7b8XhVonZABled94vr2jc0XqzYlFfYoBP0OCZ7eOl0-M=w544-h544-l90-rj",
        url: `${utils_1.server[0]}/listen/Kiston - Roohi`,
        Duration: "2: 41",
        Artist: "Sachin-Jigar, Jubin Nautiyal",
        Type: "Single",
        releaseDate: (0, utils_1.date)("26-02-2021")
    },
    {
        _albumId: "611108a9edbf925848726537",
        _trackId: "611108a9edbf925848726537",
        Album: "1-800-273-8255 (feat. Alessia Cara & Khalid)",
        AlbumArtist: "Logic",
        Year: "2017",
        Color: "rgba(216,216,192,1)",
        Thumbnail: "https://m.media-amazon.com/images/I/81pOU9aLHGL._UXNaN_FMwebp_QL85_.jpg?isCloudQueue=true",
        url: `${utils_1.server[0]}/listen/1-800-273-8255 - Logic`,
        Duration: "4: 10",
        Artist: "Logic, Alessia Cara, Khalid",
        Type: "Single",
        releaseDate: (0, utils_1.date)("05-05-2017")
    },
    {
        _albumId: "611108b8f6fe025b3c168042",
        _trackId: "611108b8f6fe025b3c168042",
        Album: "Everyday",
        AlbumArtist: "Logic",
        Year: "2018",
        Color: "rgba(192,24,32,1)",
        Thumbnail: "https://lh3.googleusercontent.com/_vIfBv2hP5qy0iLMGBu702gN6Oxw1keml_BsAeD5hR7iLmEWfSmQEyG3CUpARdq1kUUDW8ENLG6fCHce=w544-h544-l90-rj",
        url: `${utils_1.server[0]}/listen/Everyday - Logic`,
        Duration: "3: 24",
        Artist: "Logic, Marshmello",
        Type: "Single",
        releaseDate: (0, utils_1.date)("02-03-2018")
    },
    {
        _albumId: "611108c4a86cb14a4cf1a7c4",
        _trackId: "611108c4a86cb14a4cf1a7c4",
        Album: "Alone",
        AlbumArtist: "Marshmello",
        Year: "2016",
        Color: "rgba(40,136,216,1)",
        Thumbnail: "https://lh3.googleusercontent.com/lJklGBZrteai3SvZdVDyuqj5KqbiTa2QhAT1KUiyHBjaq6MbZJuT0PTyQb0UyDyuf-wE4hO0tWbVf6Lk=w544-h544-l90-rj",
        url: `${utils_1.server[0]}/listen/Alone - Marshmello`,
        Duration: "4: 33",
        Artist: "Marshmello",
        Type: "Single",
        releaseDate: (0, utils_1.date)("13-05-2016")
    },
    {
        _albumId: "61162c25d04a0c2b0060fe35",
        _trackId: "61162c25d04a0c2b0060fe35",
        Album: "Mockingbird",
        AlbumArtist: "Eminem",
        Type: "Single",
        Year: "2004",
        Color: "rgba(8,48,88,1)",
        releaseDate: (0, utils_1.date)("12-11-2004"),
        Thumbnail: "https://lh3.googleusercontent.com/oWyLklmIlgBVjLy63kmFrXfgmzK8EIwpzyXneeLu3Ly6eqB_Usf7zZhZzo-LlwbxMx4WugYNW1Lp-ec=w544-h544-l90-rj",
        // _trackId: "61162c2c4988032f4c557638",
        Artist: "Eminem",
        Duration: "4: 10",
        lyrics: true,
        sync: true,
        url: `${utils_1.server[0]}/listen/Mockingbird - Eminem`
    },
    {
        _albumId: "61173d71e850b008049625e6",
        _trackId: "61173d71e850b008049625e6",
        Album: "Space Bound",
        AlbumArtist: "Eminem",
        Type: "Single",
        Year: "2010",
        Color: "rgba(176,192,208,1)",
        releaseDate: (0, utils_1.date)("18-06-2010"),
        Thumbnail: "https://lh3.googleusercontent.com/IUuZFSUqFLMQlejTtsnLM_cB16A0T1g-savL7DYbWz5NFh2-DOw5-v9_PREJt9keX48NSan-8yUQCPM=w544-h544-l90-rj",
        // _trackId: "61173d78c0400e0f207c3b6b",
        Artist: "Eminem",
        Duration: "4: 38",
        lyrics: true,
        sync: true,
        url: `${utils_1.server[1]}/listen/Space Bound - Eminem`
    },
    {
        _albumId: "61174d671a41b60350424442",
        _trackId: "61174d671a41b60350424442",
        Album: "Godzilla (feat. Juice WRLD)",
        AlbumArtist: "Eminem",
        Year: "2020",
        Color: "rgba(128,8,32,1)",
        Thumbnail: "https://lh3.googleusercontent.com/gSjSpiwhol20w2GLjYSR81AOBvdo1UiLRBeu8RbVuRZjtHh6yipa22c26_TZK2Jm7_BGi4FApSXFIZo2VA=w544-h544-l90-rj",
        url: `${utils_1.server[1]}/listen/Godzilla - Eminem`,
        Duration: "3: 30",
        Artist: "Eminem, Juice WRLD",
        Type: "Single",
        releaseDate: (0, utils_1.date)("17-01-2020")
    },
    {
        _albumId: "6118b9936b7baa11347fdb3a",
        _trackId: "6118b9936b7baa11347fdb3a",
        Album: 'Killshot',
        AlbumArtist: "Eminem",
        Year: "2018",
        Color: "rgba(240,32,32,1)",
        Thumbnail: "https://lh3.googleusercontent.com/bVRFSKvGn8NxqDEQqedK9sZAxcRvW85feFS11zvGi8m7kXs5VxazPgjVGuuoxyCe3uu7MgOgnmuwykwF=w544-h544-l90-rj",
        url: `${utils_1.server[1]}/listen/Killshot - Eminem`,
        Duration: "4: 13",
        Artist: "Eminem",
        Type: "Single",
        lyrics: true,
        sync: true,
        releaseDate: (0, utils_1.date)("19-09-2018")
    },
    {
        _albumId: "611a410776f22851eccc4437",
        Album: "Shershaah (Original Motion Picture Soundtrack)",
        AlbumArtist: "Various Artists",
        Type: "Album",
        Year: "2021",
        Color: "rgba(64,136,160,1)",
        releaseDate: (0, utils_1.date)("16-08-2021"),
        Thumbnail: "https://lh3.googleusercontent.com/iL_YgaRWLLzfwYP1mL9mTl0776jHYymJnsNcQlkzztzVEks8z__hMIKIvMfggcaqLah3pdQxR1NcWnPf=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "611a410fe15e8c2d249e44f0",
                Title: "Raataan Lambiyan",
                Artist: "Tanishk Bagchi, Jubin Nautiyal, Asees Kaur",
                Duration: "3: 50",
                url: `${utils_1.server[0]}/listen/Raataan Lambiyan - Shershaah`
            },
            {
                _trackId: "611a4116c8637c5288881cd5",
                Title: "Ranjha",
                Artist: "Jasleen Royal, B Praak",
                Duration: "3: 48",
                url: `${utils_1.server[2]}/listen/Ranjha - Shershaah`
            },
            {
                _trackId: "611a411e8007f10b409bd2e8",
                Title: "Kabhii Tumhhe",
                Artist: "Javed-Mohsin, Darshan Raval",
                Duration: "3: 50",
                lyrics: true,
                url: `${utils_1.server[2]}/listen/Kabhii Tumhhe - Shershaah`
            },
            {
                _trackId: "611a4125c10ed20dbc1fa668",
                Title: "Mann Bharryaa 2.0",
                Artist: "B Praak",
                Duration: "4: 26",
                url: `${utils_1.server[1]}/listen/Mann Bharryaa 2.0 - Shershaah`
            }
        ]
    },
    {
        _albumId: "61212fcf2802212be0808aea",
        Album: "Overexposed",
        AlbumArtist: "Maroon 5",
        Type: "Album",
        Year: "2012",
        Color: "rgba(216,80,152,1)",
        releaseDate: (0, utils_1.date)("01-01-2012"),
        Thumbnail: "https://lh3.googleusercontent.com/aqUChJrezGmTQ2x4_-Xj28XFlUVDIqEC2f_lEugI5EYRInPjlDyzBK1G5zwdlIEuBm3wDlJEu2O7F90Z=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "61212fdcf77b7623e414a717",
                Title: "Payphone (feat. Wiz Khalifa)",
                Artist: "Maroon 5, Wiz Khalifa",
                Duration: "3: 52",
                url: `${utils_1.server[1]}/listen/Payphone - Maroon 5`
            }
        ]
    },
    {
        _albumId: "61212fe920693821b4a94111",
        Album: "JORDI (Deluxe)",
        AlbumArtist: "Maroon 5",
        Type: "Album",
        Year: "2021",
        Color: "rgba(240,200,208,1)",
        releaseDate: (0, utils_1.date)("11-06-2021"),
        Thumbnail: "https://lh3.googleusercontent.com/fQrjUmKOy8LAMC3cUOYaWOrskW6vkvvGsCzTZ-WY80-R06pMz22SjdYWSuPYS7Ms7MvcAHF4syn27Of5=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "61212ff1beac891bfcd7d7f0",
                Title: "Memories",
                Artist: "Maroon 5",
                Duration: "3: 09",
                url: `${utils_1.server[1]}/listen/Memories - Maroon 5`
            }
        ]
    },
    {
        _albumId: "6121cc273662ee25fc92b500",
        Album: "Red Pill Blues (Deluxe)",
        AlbumArtist: "Maroon 5",
        Type: "Album",
        Year: "2018",
        Color: "rgba(144,120,120,1)",
        releaseDate: (0, utils_1.date)("15-06-2018"),
        Thumbnail: "https://lh3.googleusercontent.com/ukH2eUwVN4dgJR_xTGjFuPUp0NkLnUINgEBHDGglldxDEor4GAXiC_Ssln8x6-BBsnjsu-hH149u_ao=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "6121cc31a1f8393c80583fae",
                Title: "Girls Like You (feat. Cardi B)",
                Artist: "Maroon 5, Cardi B",
                Duration: "3: 55",
                url: `${utils_1.server[1]}/listen/Girls Like You - Maroon 5`
            }
        ]
    },
    {
        _albumId: "6136e8d10727082a9421a694",
        Album: "Baaraat",
        AlbumArtist: "Ritviz, Nucleya",
        Type: "Album",
        Year: "2021",
        Color: "rgba(83,83,83,1)",
        releaseDate: (0, utils_1.date)("06-09-2021"),
        Thumbnail: "https://lh3.googleusercontent.com/HnCAKTwUaOmaapms0ITq02cTzN3FafXwjrGFR1o9voXeHIAEeFISvHZLQc972SMlR0U90fo7A8yfRmnEcg=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "6136e8f7be270f2afc707440",
                Title: "Sathi",
                Artist: "Ritviz, Nucleya",
                url: `${utils_1.server[1]}/listen/Sathi - Ritviz`,
                Duration: "3: 36",
                lyrics: true,
                sync: true
            },
            {
                _trackId: "6136e904cfa99b2b1c25632e",
                Title: "Ari Ari",
                Artist: "Ritviz, Nucleya",
                url: `${utils_1.server[1]}/listen/Ari Ari - Ritviz`,
                Duration: "2: 47"
            },
            {
                _trackId: "6136e90b3c9de72b3ba11262",
                Title: "Roz",
                Artist: "Ritviz, Nucleya",
                url: `${utils_1.server[2]}/listen/Roz - Ritviz`,
                Duration: "3: 39",
                lyrics: true,
                sync: true
            },
            {
                _trackId: "615c2524a03f787ddd881639",
                Title: "Baaraat",
                Artist: "Ritviz, Nucleya",
                url: `${utils_1.server[2]}/listen/Baaraat - Ritviz`,
                Duration: "3: 42"
            }
        ]
    },
    {
        _albumId: "6142df80fc67f2461f8f018d",
        Album: "Fukrey",
        AlbumArtist: "Ram Sampath",
        Type: "Album",
        Year: "2013",
        Color: "rgba(96,136,128,1)",
        releaseDate: (0, utils_1.date)("14-05-2013"),
        Thumbnail: "https://lh3.googleusercontent.com/IPTS10kc4jvtmdiKtcbNx7sil5icTZlYIBcYuuCnwpGWVlloH5jHtPzlfrSADNdTe6XFOXvD18_YfjoW=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "6142df8b08c3a9462e97cfcd",
                Title: "Ambarsariya",
                Artist: "Sona Mohapatra",
                url: `${utils_1.server[2]}/listen/Ambarsariya - Fukrey`,
                Duration: "4: 08"
            }
        ]
    },
    {
        _albumId: "61443b2ca132a92f588d2191",
        _trackId: "61443b2ca132a92f588d2191",
        Album: 'Sakhiyaan',
        AlbumArtist: "Maninder Buttar",
        Year: "2018",
        Color: "rgba(240,232,88,1)",
        Thumbnail: "https://lh3.googleusercontent.com/xPIMRy2kSfrBlj-eVFBY3Kv8PLQWpitn4US-0FTSHowQImMZBgLH8ROqgLvwS0ESBZQpCrOrrzTy3tLQdA=w544-h544-l90-rj",
        url: `${utils_1.server[2]}/listen/Sakhiyaan - Maninder Buttar`,
        Duration: "2: 59",
        Artist: "Maninder Buttar",
        Type: "Single",
        releaseDate: (0, utils_1.date)("21-10-2018")
    },
    {
        _albumId: "6145bae59875b659d6103509",
        _trackId: "6145bae59875b659d6103509",
        Album: 'Thoda Thoda Pyaar',
        AlbumArtist: "Stebin Ben",
        Year: "2021",
        Color: "rgba(184,80,16,1)",
        Thumbnail: "https://lh3.googleusercontent.com/hHhmLUpfNZIIgbQrVx_11-xad1ZK_Gsx-xyHN8bdEJXD9-_3krcUcghp3FXna2pUSkihj6uZLKvz99Q=w544-h544-l90-rj",
        url: `${utils_1.server[2]}/listen/Thoda Thoda Pyaar - Stebin Ben`,
        Duration: "4: 04",
        Artist: "Stebin Ben",
        Type: "Single",
        releaseDate: (0, utils_1.date)("12-02-2021")
    },
    {
        _albumId: "6151e1cd776457e7218b7f6e",
        _trackId: "6151e1cd776457e7218b7f6e",
        Album: "Dil Garti Kar Baitha Hai",
        AlbumArtist: "Jubin Nautiyal, Meet Bros.",
        Year: "2021",
        Color: "rgba(200,104,96,1)",
        Thumbnail: "https://lh3.googleusercontent.com/_dGbTJ6iIUPWJZkOwN4e75WC5tQ3_ACC3FEVL77ZGt4cGLs33KgpS3m0H7gau-Xwc5JSCZS5iu7OTiWn4A=w544-h544-l90-rj",
        url: `${utils_1.server[2]}/listen/Dil Galti Kar Baitha Hai - Jubin Nautiyal`,
        Duration: "4: 33",
        Artist: "Jubin Nautiyal, Meet Bros.",
        Type: "Single",
        releaseDate: (0, utils_1.date)("25-09-2021")
    },
    {
        _albumId: "6167ee2e741ae75976d76f2b",
        _trackId: "6167ee2e741ae75976d76f2b",
        Album: "Khushi Jab Bhi Teri",
        AlbumArtist: "Jubin Nautiyal, Rochak Kohli",
        Year: "2021",
        Color: "rgba(200,56,56,1)",
        Thumbnail: "https://lh3.googleusercontent.com/mLGi4DdlYfvordoC5XXMvHQbUotiI0n4Zm2qzSjoAMGU_pA96tjhYoc1Z4Px9ht6G1Ewm-sKvgumCexhIA=w544-h544-l90-rj",
        url: `${utils_1.server[2]}/listen/Khushi Jab Bhi Teri - Jubin Nautiyal`,
        Duration: "4: 00",
        Artist: "Rochak Kohli, Jubin Nautiyal",
        Type: "Single",
        releaseDate: (0, utils_1.date)("23-08-2021")
    },
    {
        _albumId: "6169afa0d268ed8335fff64c",
        Album: "Pushpa - The Rise (Telugu)",
        AlbumArtist: "Devi Sri Prasad",
        Type: "Album",
        Year: "2021",
        Color: "rgba(168,40,40,1)",
        releaseDate: (0, utils_1.date)("16-12-2021"),
        // Thumbnail: "https://m.media-amazon.com/images/I/81-o48Mm3sL._UXNaN_FMwebp_QL85_.jpg?isCloudQueue=true",
        Thumbnail: "https://lh3.googleusercontent.com/w20kmKC4GQzTTZn76C2iyRSiLmvZNYJTqro5RIcDJ0X13NGplU5wFU9rXUUMJOLgWCb0QyuAFMtXYsQ=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "6169afa9360f5983444290ac",
                Title: "Daakko Daakko Meka",
                Artist: "Devi Sri Prasad, Sivam",
                url: `${utils_1.server[3]}/listen/Daakko Daakko Meka - Pushpa`,
                Duration: "5: 00"
            },
            {
                _trackId: "61dd34025b2ebd735046bfe9",
                Title: "Srivalli",
                Artist: "Devi Sri Prasad, Sid Sriram",
                url: `${utils_1.server[3]}/listen/Srivalli - Pushpa`,
                Duration: "3: 44"
            },
            {
                _trackId: "61dd340a9d8b34735c5daa04",
                Title: "Oo Antava Oo Oo Antava",
                Artist: "Indravathi Chauhan",
                url: `${utils_1.server[3]}/listen/Oo Antava Oo Oo Antava - Pushpa`,
                Duration: "3: 47"
            },
            {
                _trackId: "61dd3413abc64e7366b46d65",
                Title: "Saami Saami",
                Artist: "Mounika Yadav",
                url: `${utils_1.server[3]}/listen/Saami Saami - Pushpa`,
                Duration: "3: 49"
            },
        ]
    },
    {
        _albumId: "616a9782c25ff861eec5edc7",
        Album: "Raabta",
        AlbumArtist: "Various Artists",
        Type: "Album",
        Year: "2017",
        Color: "rgba(128,40,24,1)",
        releaseDate: (0, utils_1.date)("03-06-2017"),
        Thumbnail: "https://lh3.googleusercontent.com/LBZZIThPWDYCSQVcJji-CcVDfDbYoCxLQS1WoNFxK8zOggzcdbNR4Bl2a2cVzqiD9qoatMgjrYDVfS4=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "616a978ec957de621aa6a3b8",
                Title: "Ik Vaari Aa",
                Artist: "Pritam, Arijit Singh",
                url: `${utils_1.server[1]}/listen/Ik Vaari Aa - Raabta`,
                Duration: "4: 34"
            },
            {
                _trackId: "616a97986141cc6224d467e6",
                Title: "Lambiyaan Si Judaiyaan",
                Artist: "Pritam, Arijit Singh, Shadab, Altamash Faridi",
                url: `${utils_1.server[1]}/listen/Lambiyaan Si Judaiyaan - Raabta`,
                Duration: "3: 58"
            },
            {
                _trackId: "616a97a1dbf6ea62372a3cc4",
                Title: "Main Tera Boyfriend",
                Artist: "Pritam, Arijit Singh, Neha Kakkar, Meet Bros.",
                url: `${utils_1.server[1]}/listen/Main Tera Boyfriend - Raabta`,
                Duration: "4: 36"
            },
            {
                _trackId: "616a97ab7cc31c6241305b4e",
                Title: "Darasal",
                Artist: "Pritam, Atif Aslam",
                url: `${utils_1.server[1]}/listen/Darasal - Raabta`,
                Duration: "4: 34"
            }
        ]
    },
    {
        _albumId: "6172d317e9951aa9fe793c0c",
        Album: "Ra-One",
        AlbumArtist: "Vishal-Shekhar",
        Type: "Album",
        Year: "2011",
        Color: "rgba(200,16,40,1)",
        releaseDate: (0, utils_1.date)("16-09-2011"),
        Thumbnail: "https://lh3.googleusercontent.com/ev2blQxLfdvHD_M6CqkMo_7xmIB_RhcZ6bQ0Aax-txvXmulVXodOSI5L_xumqOq3AUMgp1464tUQLs9QIg=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "6172d323726b87aa10c6552a",
                Title: "Chammak Challo",
                Artist: "Akon, Hamsika Iyer",
                url: `${utils_1.server[0]}/listen/Chammak Challo - RaOne`,
                Duration: "3: 47"
            },
            {
                _trackId: "6172d32ce1bdd2aa2461ddd2",
                Title: "Dildaara (Stand By Me)",
                Artist: "Shafqat Amanat Ali",
                url: `${utils_1.server[0]}/listen/Dildaara - RaOne`,
                Duration: "4: 09"
            },
            {
                _trackId: "6172d33480e9a5aa31d598a3",
                Title: "Criminal",
                Artist: "Akon, Vishal Dadlani, Shruti Pathak",
                url: `${utils_1.server[0]}/listen/Criminal - RaOne`,
                Duration: "5: 07"
            }
        ]
    },
    {
        _albumId: "617bc05c66c9ef59824b03b0",
        _trackId: "617bc05c66c9ef59824b03b0",
        Album: 'Aage Chal',
        AlbumArtist: "Raftaar",
        Year: "2021",
        Color: "rgba(8,56,104,1)",
        Thumbnail: "https://lh3.googleusercontent.com/-sHD89mSQjE4GHLfKvVVxI3-R4qWTNVjCOBRSHlAwl-ad0XNubkmUEp5pa5gjnmMLuUWEFN-vsiiXnL6=w544-h544-l90-rj",
        url: `${utils_1.server[0]}/listen/Aage Chal - Raftaar`,
        Duration: "3: 49",
        Artist: "Raftaar",
        Type: "Single",
        releaseDate: (0, utils_1.date)("07-01-2021")
    },
    {
        _albumId: "617bc13a41f86d5a2e5c3c1b",
        _trackId: "617bc13a41f86d5a2e5c3c1b",
        Album: 'OG',
        AlbumArtist: "KR$NA",
        Year: "2021",
        Color: "rgba(112,8,104,1)",
        Thumbnail: "https://lh3.googleusercontent.com/8t38FsHRsI9HDp9mzVaN551qCWuTERwvrg9oeow0kSm3KHLLIN1B-eCRsvnHHioYzlx9s33xFbb6tPU_=w544-h544-l90-rj",
        url: `${utils_1.server[0]}/listen/OG - KR$NA`,
        Duration: "3: 31",
        Artist: "KR$NA",
        Type: "Single",
        releaseDate: (0, utils_1.date)("13-10-2021")
    },
    {
        _albumId: "617bc2350dfdbe5b12c8ea5e",
        _trackId: "617bc2350dfdbe5b12c8ea5e",
        Album: 'Sheikh Chilli',
        AlbumArtist: "Raftaar",
        Year: "2021",
        Color: "rgba(80,80,80,1)",
        Thumbnail: "https://lh3.googleusercontent.com/TanickwxoRyOi-VsoZ59eRxbfIGiRwbkDvY-v2DZ5NETV42Xpy4OeJyvc77OHUljEAh311JnGzlGQR72=w544-h544-l90-rj",
        url: `${utils_1.server[0]}/listen/Sheikh Chilli - Raftaar`,
        Duration: "4: 12",
        Artist: "Raftaar",
        Type: "Single",
        releaseDate: (0, utils_1.date)("08-01-2021")
    },
    {
        _albumId: "617a1b0b305b2b1be4bef671",
        Album: "Sooryavanshi",
        AlbumArtist: "Various Artists",
        Type: "Album",
        Year: "2021",
        Color: "rgba(208,168,8,1)",
        releaseDate: (0, utils_1.date)("06-11-2021"),
        Thumbnail: "https://lh3.googleusercontent.com/NLIjsoMYRvJS0kWhrPc0DFxJ81wVieLJOxaPG2j6mLjYqstAt_AFqe3GJfQ9NzHxdWlEMQN0vm0rSnyf=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "617a1b162b3ccd1c0a16242c",
                Title: "Aila Re Aillaa",
                Artist: "Pritam, Tanishk Bagchi, Daler Mehndi",
                url: `${utils_1.server[1]}/listen/Aila Re Aillaa - Sooryavanshi`,
                Duration: "2: 36"
            },
            {
                _trackId: "617a1b1efa1f081c123c5fa8",
                Title: "Mere Yaaraa",
                Artist: "Arijit Singh, Neeti Mohan, Kaushik",
                url: `${utils_1.server[0]}/listen/Mere Yaaraa - Sooryavanshi`,
                Duration: "4: 45"
            },
            {
                _trackId: "618231e6c378573b1aabae31",
                Title: "Najaa",
                Artist: "Tanishk Bagchi, Pav Dharia, Nikhita Gandhi",
                url: `${utils_1.server[0]}/listen/Najaa - Sooryavanshi`,
                Duration: "3: 11"
            },
            {
                _trackId: "61952dda9547438470d1ec13",
                Title: "Tip Tip",
                Artist: "Tanishk Bagchi, Udit Narayan, Alka Yagnik",
                url: `${utils_1.server[3]}/listen/Tip Tip - Sooryavanshi`,
                Duration: "4: 10"
            },
            {
                _trackId: "61952f1725a286878248f113",
                Title: "Sooryavanshi Theme",
                Artist: "Lijo George",
                url: `${utils_1.server[3]}/listen/Sooryavanshi Theme`,
                Duration: "1: 48"
            }
        ]
    },
    {
        _albumId: "61b98f69a6911a36de1da552",
        Album: "Satyameva Jayate 2",
        AlbumArtist: "Various Artists",
        Type: "Album",
        Year: "2021",
        Color: "rgba(152,64,0,1)",
        releaseDate: (0, utils_1.date)("23-11-2021"),
        Thumbnail: "https://lh3.googleusercontent.com/kkvStTevhiZR10W3J-LyjuRmOanSFoKCbYSCxYrAbI7ggWFvySdFQ51R1J1aPNQY0tWZtMh7t1t4WSo=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "61b98f7122815c36ec3f5b2f",
                Title: "Meri Zindagi Hai Tu",
                Artist: "Rochak Kohli, Jubin Nautiyal, Neeti Mohan",
                url: `${utils_1.server[3]}/listen/Meri Zindagi Hai Tu - Satyameva Jayate 2`,
                Duration: "4: 44"
            },
            {
                _trackId: "61b98f7b41e59636f6253b07",
                Title: "Kusu Kusu",
                Artist: "Tanishk Bagchi, Zahrah S Khan, Dev Negi",
                url: `${utils_1.server[3]}/listen/Kusu Kusu - Satyameva Jayate 2`,
                Duration: "3: 15"
            }
        ]
    },
    {
        _albumId: "618e077d67371c2f91f5d6cf",
        _trackId: "618e077d67371c2f91f5d6cf",
        Album: 'No Cap',
        AlbumArtist: "KR$NA",
        Year: "2021",
        Color: "rgba(248,96,88,1)",
        Thumbnail: "https://lh3.googleusercontent.com/5UpT2hG4hlB1t3doKC4HWloVK5wgWsaZYyJqQI_MaLQM3gTlph25OuHIg3GGlLktnPY4SnGgyUmfh161sQ=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/No Cap - KR$NA`,
        Duration: "3: 25",
        Artist: "KR$NA",
        Type: "Single",
        lyrics: true,
        sync: true,
        releaseDate: (0, utils_1.date)("10-11-2021")
    },
    {
        _albumId: "6194a1863fa65728f15d5a91",
        Album: "Ajab Prem Ki Ghazab Kahani",
        AlbumArtist: "Pritam",
        Type: "Album",
        Year: "2009",
        Color: "rgba(248,112,32,1)",
        releaseDate: (0, utils_1.date)("06-11-2009"),
        Thumbnail: "https://lh3.googleusercontent.com/q0UH44DhbQcuEgst2IVV9cgHgXdPksIVkgixk1uDT7-wIDS1YlNAre2I3JAUFYrHJzXu9D57wRYbI7U=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "6194a18f049e5128ff467abb",
                Title: "Tu Jaane Na",
                Artist: "Atif Aslam",
                url: `${utils_1.server[3]}/listen/Tu Jaane Na - Ajab Prem Ki Ghazab Kahani`,
                Duration: "5: 41",
                lyrics: true,
                sync: true
            }
        ]
    },
    {
        _albumId: "619e3a0b409dfd9fe18b1e34",
        _trackId: "619e3a0b409dfd9fe18b1e34",
        Album: 'Boom Boom',
        AlbumArtist: "Yo Yo Honey Singh",
        Year: "2021",
        Color: "rgba(32,168,216,1)",
        Thumbnail: "https://lh3.googleusercontent.com/O3X6MO25G6lkqsHRGOdYEidBW90fR2ZvpmtTJCxZfUd5r69p2yI5gXTMRumUdQgYflT3_PUwmOceUKk5=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Boom Boom - Yo Yo Honey Singh`,
        Duration: "3: 30",
        Artist: "Yo Yo Honey Singh, Hommie Dilliwala",
        Type: "Single",
        releaseDate: (0, utils_1.date)("24-11-2021")
    },
    {
        _albumId: "61a086200ee3752e85a8ea3d",
        _trackId: "61a086200ee3752e85a8ea3d",
        Album: 'Bin Bulaye',
        AlbumArtist: "Dino James",
        Year: "2021",
        Color: "rgba(200,152,64,1)",
        Thumbnail: "https://lh3.googleusercontent.com/tKZqi8vxEQkDinNluHeTh0hn67J6l-v6U8eb8i4HrGBh_3960imMuRCleX4Aj1me5pGrImMSgYKWfxS2=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Bin Bulaye - Dino James`,
        Duration: "4: 37",
        Artist: "Dino James",
        Type: "Single",
        releaseDate: (0, utils_1.date)("24-11-2021")
    },
    {
        _albumId: "61a34a6b983c0b19f048bc38",
        Album: "Agneepath",
        AlbumArtist: "Ajay-Atul",
        Type: "Album",
        Year: "2011",
        Color: "rgba(72,24,16,1)",
        releaseDate: (0, utils_1.date)("16-12-2011"),
        Thumbnail: "https://lh3.googleusercontent.com/8R_aFURgdR4cGtk_ScZpX2UoQFqW5x7MOeFSvoh7yvdlK6UJ0tk6zEuyxxv2xhTt2-6OhqKWAsAhZeU=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "61a34a75310af919fa6284a1",
                Title: "Chikni Chameli",
                Artist: "Ajay-Atul, Shreya Ghoshal",
                url: `${utils_1.server[3]}/listen/Chikni Chameli - Agneepath`,
                Duration: "5: 03"
            },
            {
                _trackId: "61a34a7b01eede1a0207350c",
                Title: "Abhi Mujh Mein Kahin",
                Artist: "Ajay-Atul, Sonu Nigam",
                url: `${utils_1.server[3]}/listen/Abhi Mujh Mein Kahin - Agneepath`,
                Duration: "6: 04"
            }
        ]
    },
    {
        _albumId: "61a619a270ad25981ddb0742",
        _trackId: "61a619a270ad25981ddb0742",
        Album: 'Goat Dekho',
        AlbumArtist: "Raftaar",
        Year: "2021",
        Color: "rgba(216,176,0,1)",
        Thumbnail: "https://lh3.googleusercontent.com/ihQDeWHeE8F1JaNzmOz5DyauIr3onX_zmnj1ic5fUeK0F-Pe6c4kgk4zcDgJFD2yuHBY_sd2efNakCnU7A=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Goat Dekho - Raftaar`,
        Duration: "3: 33",
        Artist: "Raftaar",
        Type: "Single",
        releaseDate: (0, utils_1.date)("30-11-2021")
    },
    {
        _albumId: "61af0cdf196df7438d639be7",
        Album: "Atrangi Re",
        AlbumArtist: "A.R. Rahman",
        Type: "Album",
        Year: "2021",
        Color: "rgba(24,48,56,1)",
        releaseDate: (0, utils_1.date)("06-12-2021"),
        Thumbnail: "https://lh3.googleusercontent.com/SptwamjhlZv04fzi3B-Crqyl7HZMXrNBIzexCgLjdxJ9SXxciHbpNc7ybSXmfJAxnGa_j0M0JtG635PZuw=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "61af0ce8e5ef3c4398fcd51d",
                Title: "Chaka Chak",
                Artist: "A.R. Rahman, Shreya Ghoshal",
                Duration: "4: 29",
                url: `${utils_1.server[3]}/listen/Chaka Chak - Atrangi Re`
            },
            {
                _trackId: "61af0cefe3584543a36e6e7b",
                Title: "Rait Zara Si",
                Artist: "A.R. Rahman, Arijit Singh, Shashaa Tirupati",
                Duration: "4: 51",
                url: `${utils_1.server[3]}/listen/Rait Zara Si - Atrangi Re`
            }
        ]
    },
    {
        _albumId: "61af7740fbea65152951353c",
        _trackId: "61af7740fbea65152951353c",
        Album: "Slow Slow",
        AlbumArtist: "Badshah, Payal Dev",
        Year: "2021",
        Color: "rgba(88,120,96,1)",
        Thumbnail: "https://lh3.googleusercontent.com/eLb2hwcJ1G5mS8O6-krbaaZE-ZUwPT4MmEI4aBVH30YB3Lm2M6qEDWzwbStjrXkTlqB4tUcqUHG8U3sX=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Slow Slow - Badshah`,
        Duration: "3: 40",
        Artist: "Badshah, Payal Dev",
        Type: "Single",
        releaseDate: (0, utils_1.date)("07-12-2021")
    },
    {
        _albumId: "61be0b94fa2f43136d8894d6",
        _trackId: "61be0b94fa2f43136d8894d6",
        Album: 'Bijlee Bijlee',
        AlbumArtist: "Harrdy Sandhu",
        Year: "2021",
        Color: "rgba(216,96,96,1)",
        Thumbnail: "https://lh3.googleusercontent.com/nR9vBx-e1fjukK48Z9-P14B_WuRLWRV9Dxdy9elRJOUOJtVWUVS50TK3r_xxNILCbHFv80bTtUcjJzky=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Bijlee Bijlee - Harrdy Sandhu`,
        Duration: "2: 48",
        Artist: "Harrdy Sandhu",
        Type: "Single",
        releaseDate: (0, utils_1.date)("30-10-2021")
    },
    {
        _albumId: "61c184b8547f1f40ffd03c51",
        _trackId: "61c184b8547f1f40ffd03c51",
        Album: "Dance Meri Rani",
        AlbumArtist: "Tanishk Bagchi, Guru Randhawa, Zahrah S Khan",
        Year: "2021",
        Color: "rgba(88,16,8,1)",
        Thumbnail: "https://lh3.googleusercontent.com/10H9QuFv9bak36vfybYAvP2UOkIWdfgBhBA4mqsGFgMT3Pz2jP02BjTX_sWjhPL3M5Xq_8BFl7AAn0loDQ=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Dance Meri Rani - Guru Randhawa`,
        Duration: "3: 43",
        Artist: "Tanishk Bagchi, Guru Randhawa, Zahrah S Khan",
        Type: "Single",
        releaseDate: (0, utils_1.date)("21-12-2021")
    },
    {
        _albumId: "61ade3761e67eb6bb1367c8c",
        Album: "83 (Original Motion Picture Soundtrack)",
        AlbumArtist: "Pritam",
        Type: "Album",
        Year: "2021",
        Color: "rgba(128,112,64,1)",
        releaseDate: (0, utils_1.date)("23-12-2021"),
        Thumbnail: "https://lh3.googleusercontent.com/yuANI6Qzit_8UZ_NG543ooMjP6mUTYgi6nB-HcNW9OjQTa5CgMWox1v56KZiApl_0Cj59rLpzJNVFaYRhg=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "61c84238c64eb9c75baa3989",
                Title: "Lehra Do",
                Artist: "Pritam, Arijit Singh",
                Duration: "3: 37",
                url: `${utils_1.server[3]}/listen/Lehra Do - 83`
            },
            {
                _trackId: "61c84250ee9aebd785d1b0ee",
                Title: "Jeetega Jeetega Film Version",
                Artist: "Pritam, Arijit Singh",
                Duration: "3: 57",
                url: `${utils_1.server[3]}/listen/Jeetega Jeetega Film Version - 83`
            }
        ]
    },
    {
        _albumId: "61c8453bfd646ff0b39e6fb0",
        Album: "Jersey (Original Motion Picture Soundtrack)",
        AlbumArtist: "Sachet-Parampara",
        Type: "Album",
        Year: "2021",
        Color: "rgba(176,24,40,1)",
        releaseDate: (0, utils_1.date)("24-12-2021"),
        Thumbnail: "https://lh3.googleusercontent.com/1vJy65mfT1ZYTPQFgO3LIRMyFQefaxNob4ENT5E5UilF-Rp4qXy4-E8HvS-XnPKtPFHTBQDTrg0zNZAM=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "61a8a73bea50605d575d979c",
                Title: "Mehram",
                Artist: "Sachet Tandon",
                Duration: "3: 47",
                url: `${utils_1.server[3]}/listen/Mehram - Jersey`
            },
            {
                _trackId: "61b18783af7674287b22a994",
                Title: "Maiyya Mainu",
                Artist: "Sachet Tandon",
                Duration: "3: 51",
                url: `${utils_1.server[3]}/listen/Maiyya Mainu - Jersey`
            },
            {
                _trackId: "61c8452d0e0d3d702de4962f",
                Title: "Baliye Re",
                Artist: "Sachet Tandon, Stebin Ben, Parampara Tandon, MellowD",
                Duration: "3: 07",
                url: `${utils_1.server[3]}/listen/Baliye Re - Jersey`
            }
        ]
    },
    {
        _albumId: "61ee5fdf29abfc526ee8531d",
        Album: "Garuda Gamana Vrishabha Vahana",
        AlbumArtist: "Midhun Mukundan",
        Type: "Album",
        Year: "2021",
        Color: "rgba(160,56,8,1)",
        releaseDate: (0, utils_1.date)("03-12-2021"),
        Thumbnail: "https://lh3.googleusercontent.com/zo0CQmoCyNN01H-Y3Ltp7J6IqJRmgSsOClSmlQFDigQbBqw7pzhsANBPTXXXJDxX5_j_NZpwxYMU2Ys=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "61ee5febf3b945527fae59ca",
                Title: "Endo Bareda",
                Artist: "Midhun Mukundan, Vasuki Vaibhav",
                Duration: "3: 55",
                url: `${utils_1.server[3]}/listen/Endo Bareda - GGVV`
            },
            {
                _trackId: "61ee5ff2324a43528770ff95",
                Title: "Sojugada Soojumallige",
                Artist: "Midhun Mukundan, Chaitra J Achar",
                Duration: "2: 47",
                url: `${utils_1.server[3]}/listen/Sojugada Soojumallige - GGVV`
            }
        ]
    },
    {
        _albumId: "61f3997a57824141a6ea9b4e",
        _trackId: "61f3997a57824141a6ea9b4e",
        Album: "Excuses",
        AlbumArtist: "AP Dhillon, Gurinder Gill, Intense",
        Year: "2020",
        Color: "rgba(200,88,160,1)",
        Thumbnail: "https://lh3.googleusercontent.com/YodB8IMuc531lUrvJBl5gwh5yl242hTBKfVj-cpk4oFOqOm-wElw5Lcw3_DvagrR0arcXXs19l6xr6MN5Q=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Excuses - AP Dhillon`,
        Duration: "2: 56",
        Artist: "AP Dhillon, Gurinder Gill, Intense",
        Type: "Single",
        lyrics: true,
        sync: true,
        releaseDate: (0, utils_1.date)("24-07-2020")
    },
    {
        _albumId: "61f512bd92c8fdab6123aadd",
        _trackId: "61f512bd92c8fdab6123aadd",
        Album: "Insane",
        AlbumArtist: "AP Dhillon, Shinda Kahlon, Gurinder Gill, Gminxr",
        Year: "2021",
        Color: "rgba(152,112,112,1)",
        Thumbnail: "https://lh3.googleusercontent.com/KeEBJiN7-fZM1K8i9Kzvo3lvMCOik6rfSV-pQETMJZnJzEh760ICEeFnJQFCFzB5DbOYFc97UfaBuRpymQ=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Insane - AP Dhillon`,
        Duration: "3: 26",
        Artist: "AP Dhillon, Shinda Kahlon, Gurinder Gill, Gminxr",
        Type: "Single",
        releaseDate: (0, utils_1.date)("16-04-2021")
    },
    {
        _albumId: "61f7da84630ef2ada31c7d1f",
        Album: "HIDDEN GEMS",
        AlbumArtist: "Various Artists",
        Type: "Album",
        Year: "2021",
        Color: "rgba(136,176,192,1)",
        releaseDate: (0, utils_1.date)("21-11-2021"),
        Thumbnail: "https://lh3.googleusercontent.com/ciA_XfgFe6uevhFb3AimcHHFbXZBD6sV9Vj3tTgjNcNwXsdozzE9ESOMUJD9LVke8DA9KWqEwQSEwvIk=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "61f7da941c12066f17bbd74e",
                Title: "DESIRES",
                Artist: "AP Dhillon, Gurinder Gill",
                Duration: "2: 48",
                url: `${utils_1.server[3]}/listen/Desires - AP Dhillon`
            },
            {
                _trackId: "6203dc38e8924d614f5c4381",
                Title: "TERE TE",
                Artist: "AP Dhillon, Gurinder Gill",
                Duration: "1: 54",
                url: `${utils_1.server[3]}/listen/Tere Te - AP Dhillon`
            }
        ]
    },
    {
        _albumId: "61f7daa03d50ac2162ffd6e3",
        _trackId: "61f7daa03d50ac2162ffd6e3",
        Album: "Saada Pyaar",
        AlbumArtist: "AP Dhillon, Gurinder Gill, Money Musik",
        Year: "2021",
        Color: "rgba(192,104,104,1)",
        Thumbnail: "https://lh3.googleusercontent.com/pU8_889hY9-x1v-fFWaCAggLbf90jchYYxXUmDMd5sy6-aIoyv4TA-DcdQkAqzOtb9_KvqhQX_CyTX6E=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Saada Pyaar - AP Dhillon`,
        Duration: "3: 33",
        Artist: "AP Dhillon, Gurinder Gill, Money Musik",
        Type: "Single",
        releaseDate: (0, utils_1.date)("19-12-2021")
    },
    {
        _albumId: "62074f10bbb6250989a312bd",
        Album: "The Carnival",
        AlbumArtist: "King",
        Type: "Album",
        Year: "2020",
        Color: "rgba(184,8,32,1)",
        releaseDate: (0, utils_1.date)("21-09-2020"),
        Thumbnail: "https://lh3.googleusercontent.com/BhJJKc9QEjxLIu4yL7Dd0HixVF5QHC4B9VEF8dbCQlUB2CV8HPMUU3Xe-G9ggCPsDbrDUQmOtgQ67pU=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "62130a825fae3f55cc7a93df",
                Title: "IICONIC",
                Artist: "King",
                Duration: "2: 58",
                lyrics: true,
                sync: true,
                url: `${utils_1.server[3]}/listen/IICONIC - King`
            },
            {
                _trackId: "62074f256eeadc2d59864985",
                Title: "Tu Aake Dekhle",
                Artist: "King",
                Duration: "4: 30",
                lyrics: true,
                sync: true,
                url: `${utils_1.server[3]}/listen/Tu Aake Dekhle - King`
            }
        ]
    },
    {
        _albumId: "6207a6f8d09acb843e445a21",
        _trackId: "6207a6f8d09acb843e445a21",
        Album: "Dhokha",
        AlbumArtist: "Arijit Singh, Manan Bhardwaj",
        Year: "2022",
        Color: "rgba(16,64,152,1)",
        Thumbnail: "https://lh3.googleusercontent.com/EXgS1qTaFeZxoV1GCbQ-v0lkCuDk_qFU3WJ4yxtaFsfv3jXhU_VN69-M-CtwEt-AX61p_UHwVDjYxQg=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Dhokha - Arijit Singh`,
        Duration: "4: 05",
        Artist: "Arijit Singh, Manan Bhardwaj",
        Type: "Single",
        releaseDate: (0, utils_1.date)("10-02-2022")
    },
    {
        _albumId: "620e853704d56a3ca0316f7e",
        _trackId: "620e853704d56a3ca0316f7e",
        Album: 'Arabic Kuthu - Halamithi Habibo (From "Beast")',
        AlbumArtist: "Anirudh Ravichander, Jonita Gandhi",
        Year: "2022",
        Color: "rgba(96,48,8,1)",
        Thumbnail: "https://lh3.googleusercontent.com/O4RhrlnxH-04BkiZEGih1ZfpkRwsbF4gsF-fGJL0jUactIoK732grGn3FWbKdhTqkBvRK9Hvw2riIetI=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Arabic Kuthu - Beast`,
        Duration: "4: 39",
        Artist: "Anirudh Ravichander, Jonita Gandhi",
        Type: "Single",
        releaseDate: (0, utils_1.date)("14-02-2022")
    },
    {
        _albumId: "6211d3efb88608687a3aadde",
        Album: "Insaan",
        AlbumArtist: "MC STAN",
        Type: "Album",
        Year: "2022",
        Color: "rgba(72,24,16,1)",
        releaseDate: (0, utils_1.date)("18-02-2022"),
        Thumbnail: "https://lh3.googleusercontent.com/GGCm9oWw7Y3QqAzt8s88mG1Sx1oBbOqS1m-HrO2RleH2LuQ7US2keO3wvLONNeV8Wg8gP7q91czbWS7u=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "6211d4158189f980eaed3c78",
                Title: "Insaan",
                Artist: "MC STAN",
                Duration: "3: 25",
                url: `${utils_1.server[3]}/listen/Insaan - MC STAN`
            }
        ]
    },
    {
        _albumId: "621a1005c91e656764dc741f",
        _trackId: "621a1005c91e656764dc741f",
        Album: "Afsanay",
        AlbumArtist: "Talhah Yunus, Talha Anjum, Young Stunners",
        Year: "2021",
        Color: "rgba(32,48,72,1)",
        Thumbnail: "https://lh3.googleusercontent.com/YSYw9bEsPrFrSl4fp4GN0zBUE95KJ99nsWgrZEfvHCIlnyxN4yl3FcDV2T4g4EsJKaWqmB4OeBJA5FHE=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Afsanay - Young Stunners`,
        Duration: "5: 43",
        lyrics: true,
        sync: true,
        Artist: "Talhah Yunus, Talha Anjum, Young Stunners",
        Type: "Single",
        releaseDate: (0, utils_1.date)("30-03-2021")
    },
    {
        _albumId: "6228c283a0c4690fdd1836c6",
        _trackId: "6228c283a0c4690fdd1836c6",
        Album: 'Saare Bolo Bewafa (From "Bachchhan Paandey")',
        AlbumArtist: "B Praak",
        Year: "2022",
        Color: "rgba(120,32,40,1)",
        Thumbnail: "https://lh3.googleusercontent.com/mB2UiSPMVZDcGEEVoPDIZxh4UWmpu-QW2WSboec5Y4OBHbv4MWM7BP1NmAGKxgLJ7Rb78AsiNNHxdWly=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Saare Bolo Bewafa - Bachchhan Paandey`,
        Duration: "3: 46",
        Artist: "B Praak",
        Type: "Single",
        releaseDate: (0, utils_1.date)("07-03-2022")
    },
    {
        _albumId: "622b4f2b3ed66d16a2a3da24",
        _trackId: "622b4f2b3ed66d16a2a3da24",
        Album: "Blowing Up",
        AlbumArtist: "KR$NA",
        Year: "2022",
        Color: "rgba(168,0,16,1)",
        Thumbnail: "https://lh3.googleusercontent.com/3TmeIq-T8Xs199YMt3U2ISMYTTUqx-AZ2QCKxbGdSX-Zav2Ir3qUSXuQJOpqI2_FKEuEE4xr3_k8vcIB=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Blowing Up - KR$NA`,
        Duration: "4: 07",
        Artist: "KR$NA",
        Type: "Single",
        releaseDate: (0, utils_1.date)("10-03-2022")
    },
    {
        _albumId: "622ef59e3d10f74c27e3e980",
        _trackId: "622ef59e3d10f74c27e3e980",
        Album: "Sab Jaanta Hai",
        AlbumArtist: "Ikka",
        Year: "2022",
        Color: "rgba(136,48,144,1)",
        Thumbnail: "https://lh3.googleusercontent.com/6HcKZnA2vAoflil4ouuo79tHXNI6J-9NjxRZMZ2utgEsT6DKILxGMrDX32Q1TFyoWLu4Q-_4pQITjgFy=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Sab Jaanta Hai - Ikka`,
        Duration: "3: 00",
        Artist: "Ikka",
        Type: "Single",
        releaseDate: (0, utils_1.date)("27-01-2022")
    },
    {
        _albumId: "622f6495030f1e1c45eb5111",
        Album: "Retropanda - Part 1",
        AlbumArtist: "Badshah",
        Type: "Album",
        Year: "2022",
        Color: "rgba(248,48,200,1)",
        releaseDate: (0, utils_1.date)("14-03-2022"),
        Thumbnail: "https://lh3.googleusercontent.com/l9kGz-BKvEVpkeNFDSpbLEWri4Aph-fo8LAwXjDY9nfyEHIhdbgSHdH37FB_XhG5c59mpAmCF0OvkKUx=w544-h544-l90-rj",
        Tracks: [
            {
                _trackId: "622f64a2e2337d7a21eb8a5b",
                Title: "Tabahi",
                Artist: "Badshah",
                Duration: "2: 48",
                url: `${utils_1.server[3]}/listen/Tabahi - Badshah`
            },
            {
                _trackId: "622f64afbf0711dbfc77aba5",
                Title: "Chamkeela Chehra",
                Artist: "Badshah",
                Duration: "2: 59",
                url: `${utils_1.server[3]}/listen/Chamkeela Chehra - Badshah`
            },
            {
                _trackId: "622f64c2933170a53ac5f3cb",
                Title: "Hosh",
                Artist: "Badshah, Aastha Gill",
                Duration: "4: 00",
                url: `${utils_1.server[3]}/listen/Hosh - Badshah`
            },
            {
                _trackId: "622f64cffdd4485bd141605c",
                Title: "Jugnu",
                Artist: "Badshah, Nikhita Gandhi",
                Duration: "3: 51",
                url: `${utils_1.server[0]}/listen/Jugnu - Badshah`
            }
        ]
    },
    {
        _albumId: "62317b41b75bbb1740a6711a",
        _trackId: "62317b41b75bbb1740a6711a",
        Album: "Nishu",
        AlbumArtist: "Ikka",
        Year: "2022",
        Color: "rgba(56,64,80,1)",
        Thumbnail: "https://lh3.googleusercontent.com/1fv9ElyEpMbdZUOdpxXD4EZOv87uDZQNbrZloTpW-hJ-R0yAUWoLMQoOIDfVpevpcJul2eHL5-xonL4N=w544-h544-l90-rj",
        url: `${utils_1.server[3]}/listen/Nishu - Ikka`,
        Duration: "3: 32",
        Artist: "Ikka",
        Type: "Single",
        releaseDate: (0, utils_1.date)("15-03-2022")
    }
];
exports.default = songlist;
//# sourceMappingURL=songlist2.js.map
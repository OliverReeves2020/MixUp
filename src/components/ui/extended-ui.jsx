import React, {useEffect, useState} from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from "./alert-dialog";
import {Button} from "./button";
import {ScrollArea} from "./scroll-area";
import {fetchPlaylists} from "../../app/spotify/SpotifyPlaylists";
import {Checkbox} from "./checkbox";
import {useStore} from "@tanstack/react-store";
import {store} from "../../store";


const LogoutButton = ({action}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild><Button>logout</Button></AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to log out?</AlertDialogTitle>
                    <AlertDialogDescription>

                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={action}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

//store.setState(() => {
//             return { refreshPlaylist: date.getHours().toString()+date.getMinutes().toString()};
//         });


//TODO improve checkbox with use of forms to make cleaner

const Playlist = ({id,name, img, number}) => {
    let playlistDatatemp;
    playlistDatatemp = useStore(store, store => store.selectedPlaylists)

    const handleCheckboxChange = (key, checked) => {

        if (checked) {

            store.setState(() => {
                if (playlistDatatemp == null) {
                    return {selectedPlaylists: [key]};
                } else {
                    return {selectedPlaylists: [...playlistDatatemp, key]};
                }
            });
        } else {
            store.setState(() => {
                return {selectedPlaylists: playlistDatatemp.filter((value) => value !== key)}
            });
        }

    };


    return (
        <div className="flex items-center w-52 h-32 snap-end">
            <div className="aspect-square w-1/2 rounded-full border-2 border-rose-500 overflow-clip"><img src={img}/>
            </div>
            <div className="m-2 h-max w-40 truncate">
                <h6>{name}</h6>
                <p>{number}</p>
            </div>
            <div className="w-1/5"><Checkbox id={id}
                                             checked={playlistDatatemp ? playlistDatatemp.includes(id) : false}
                                             onCheckedChange={(checked) => handleCheckboxChange(id, checked)}
            ></Checkbox></div>

        </div>
    );
}


const PlaylistsSelection = (props, ref) => {
    let refresh;
    refresh = useStore(store, store => store.refreshPlaylist)


    const [playlistData, setPlaylistData] = useState([]);
    const populateFunc = async () => {
        try {
            console.log("run");
            const result = await fetchPlaylists();
            setPlaylistData(result);
            console.log("xxx", playlistData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    useEffect(() => {
        if (refresh != null) {
            console.log(refresh)
            console.log("refreshing")
            populateFunc();
        }
    }, [refresh])


    return (

        <ScrollArea className="h-96 ">
            <div>
                <h4 className="mb-4 text-sm font-medium leading-none absolute top-0">Playlists</h4>
                {playlistData.map((tag) => (
                    <Playlist key={tag.id} id={tag.id} name={tag.name} img={tag.images} number={tag.number}></Playlist>
                ))}
            </div>
        </ScrollArea>
    );
}


export {LogoutButton, PlaylistsSelection};

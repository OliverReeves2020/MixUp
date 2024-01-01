import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react';
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



const Playlist = ({name,img,number}) => {

    const [checkboxState, setCheckboxState] = useState([]);
    const handleCheckboxChange = (name, checked) => {
        setCheckboxState((prev) =>
            checked ? [...prev, name] : prev.filter((value) => value !== name)

        );console.log(checkboxState);
    };


    return (
        <div className="flex items-center w-52 h-32 snap-end">
            <div className="aspect-square w-1/2 rounded-full border-2 border-rose-500 overflow-clip"><img src={img}/></div>
            <div className="m-2 h-max w-40 truncate">
                <h6>{name}</h6>
                <p>{number}</p>
            </div>
            <div className="w-1/5"><Checkbox id={name}
                                             checked={checkboxState.includes(name)}
                                             onCheckedChange={(checked) => handleCheckboxChange(name, checked)}
            ></Checkbox></div>

        </div>
    );
}



const PlaylistsSelection=forwardRef((props,ref)=>{

    useImperativeHandle(ref,()=>{
        return{
          populateFunc:populateFunc,
        };
    })

    const [playlistData, setPlaylistData] = useState([]);
    const populateFuncRef = useRef(null);
    const populateFunc = async () => {
        const fetchData = async () => {
            try {
                console.log("run");
                const result = await fetchPlaylists();
                setPlaylistData(result);
                console.log("xxx",playlistData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    };

    // Expose populateFunc through ref
    populateFuncRef.current = populateFunc;// Empty dependency array to ensure the effect runs only once on mount
    return(
        <ScrollArea className="h-96 ">
            <div >
                <h4 className="mb-4 text-sm font-medium leading-none absolute top-0">Playlists</h4>
                {playlistData.map((tag) => (
                        <Playlist key={tag.name} name={tag.name} img={tag.images} number={tag.number}></Playlist>
                ))}
            </div>
        </ScrollArea>
    );
});


export {LogoutButton,PlaylistsSelection};

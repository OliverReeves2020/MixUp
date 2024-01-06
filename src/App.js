import './App.css';
import 'src/app/global.css'


import {Button} from "./components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "./components/ui/card";
import DemoPage from "./app/payments/page.tsx";
import useSpotifyAuthentication from './app/spotify/SpotifyAuth.js'
import {LogoutButton, PlaylistsSelection} from "./components/ui/extended-ui";
import {fetchPlaylists, fetchSongs} from "./app/spotify/SpotifyPlaylists";
import {useRef} from "react";
import {store} from "./store";
import {useStore} from "@tanstack/react-store";


function App() {


    const CLIENT_ID = "6ae2cae9a6d944faaf54ab8f30dbc31b"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    //const [token, setToken] = useState("")
    const {token, logout} = useSpotifyAuthentication();
    //TODO fix issue with selecting checkbox then refresh cuasing undefined
    const handlePlaylistRefresh = () => {
        let date = new Date();
        date = date.getHours().toString() + date.getMinutes().toString()
        store.setState(() => {
            return {refreshPlaylist: date};
        });
    }
    let playlistDatatemp;
    playlistDatatemp = useStore(store, store => store.selectedPlaylists)
    const test = () => {

        console.log(playlistDatatemp)
    }


    //TODO add import button taking selected songs and display on table
    return (

        <main className="bg-background text-foreground">
            <header className="App-header ">
                <h1 className={"text-2xl"}>mixup</h1>
            </header>


            <div className="grid grid-cols-3 gap-10">
                <PlaylistsSelection></PlaylistsSelection>
            </div>

            <Button onClick={handlePlaylistRefresh}>refresh</Button>
            <Button onClick={test}>test</Button>
            <Button >import</Button>

            <div><Button onClick={() => fetchSongs(playlistDatatemp)}>songs</Button></div>
            <div><Button onClick={fetchPlaylists}>playlists</Button></div>


            {!token ?
                <Button>
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a></Button>
                :
                <LogoutButton action={logout}/>}


            <Card>
                <CardHeader>
                    <CardTitle>Table</CardTitle>
                </CardHeader>
                <CardContent>
                    <DemoPage/>

                </CardContent>
            </Card>
        </main>
    );
}

export default App;

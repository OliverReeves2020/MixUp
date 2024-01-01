import './App.css';
import 'src/app/global.css'


import {Button} from "./components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "./components/ui/card";
import DemoPage from "./app/payments/page.tsx";
import useSpotifyAuthentication from './app/spotify/SpotifyAuth.js'
import {LogoutButton, PlaylistsSelection} from "./components/ui/extended-ui";
import {fetchAlbums, fetchPlaylists} from "./app/spotify/SpotifyPlaylists";
import {useRef} from "react";



function App() {


    const CLIENT_ID = "6ae2cae9a6d944faaf54ab8f30dbc31b"
    const REDIRECT_URI = "http://localhost:3000"
    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const RESPONSE_TYPE = "token"

    //const [token, setToken] = useState("")
    const {token, logout} = useSpotifyAuthentication();
    const childref = useRef();

    return (

        <main className="bg-background text-foreground">
            <header className="App-header ">
                <h1 className={"text-2xl"}>mixup</h1>
            </header>

            <Button onClick={()=>childref.current.populateFunc()}>refresh</Button>
            <div className="grid grid-cols-3 gap-10">
               <PlaylistsSelection ref={childref}></PlaylistsSelection>

            </div>







            <div><Button onClick={fetchAlbums}>albums</Button></div>
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

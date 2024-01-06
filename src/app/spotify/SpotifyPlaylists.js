import {useStore} from "@tanstack/react-store";
import {store} from "../../store";

export async function fetchPlaylists(): Promise<any> {
    const token = window.localStorage.getItem("token");
    const result = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET", headers: {Authorization: `Bearer ${token}`}
    });

    const r = await result.json();
    return r.items.map((item: any) => ({
        name: item.name,
        images: item.images[0].url,
        number: item.tracks.total,
        id: item.id,
    }));
}


export async function fetchSongs(ids): Promise<any> {

    if (ids === null) {
        // Handle the case where ids is null
        throw new Error("IDs cannot be null");
    }

    //TODO make local storage of album ids or state
    const token = window.localStorage.getItem("token");
    const albumIds = ids;
    const albumPromises = albumIds.map(async (albumId) => {
        const result = await fetch(`https://api.spotify.com/v1/playlists/${albumId}/tracks`, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });

        return result.json();
    });

    async function fetchAlbumDetails(url) {
        const result = await fetch(url, {
            method: "GET",
            headers: {Authorization: `Bearer ${token}`},
        });

        return result.json();
    }

    async function albumfun(albumDetails) {
        let result=[]

        for (const album of albumDetails) {
            if (album && album.items) {
            album.items.forEach((item, index) => {
                result.push(item.track.name)
                // Process other item details as needed
            });

            // Check if there is a next page
            let nextUrl = album.next;
            while (nextUrl) {
                const nextAlbum = await fetchAlbumDetails(nextUrl);

                nextAlbum.items.forEach((item, index) => {

                    result.push(item.track.name)
                    // Process other item details as needed
                });

                // Update nextUrl for the next iteration
                nextUrl = nextAlbum.next;
            }
        }}
        console.log(result)
        return result;
    }

// Wait for all album details to be fetched
    const albumDetails = await Promise.all(albumPromises);

// Process album details
    return await albumfun(albumDetails);


}


export async function fetchPlaylists(): Promise<any> {
    const token = window.localStorage.getItem("token");
    const result = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET", headers: {Authorization: `Bearer ${token}`}
    });

    const r = await result.json();

    const simplifiedPlaylists = r.items.map((item: any) => ({
        name: item.name,
        images: item.images[0].url,
        number: item.tracks.total,
    }));
    console.log(simplifiedPlaylists);
    return simplifiedPlaylists;
}


export async function fetchAlbums(): Promise<any> {


    const token = window.localStorage.getItem("token");
    const albumIds = ["2IW4YpnuKOZkhFeH8WTLHu"];
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

        for (const album of albumDetails) {
            if (album && album.items) {
            album.items.forEach((item, index) => {
                console.log(item.track.name);
                // Process other item details as needed
            });

            // Check if there is a next page
            let nextUrl = album.next;
            while (nextUrl) {
                const nextAlbum = await fetchAlbumDetails(nextUrl);

                nextAlbum.items.forEach((item, index) => {
                    console.log("next >>>", item.track.name);
                    // Process other item details as needed
                });

                // Update nextUrl for the next iteration
                nextUrl = nextAlbum.next;
            }
        }}
    }

// Wait for all album details to be fetched
    const albumDetails = await Promise.all(albumPromises);

// Process album details
    await albumfun(albumDetails);


}


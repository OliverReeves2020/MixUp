import {useEffect, useState} from 'react';


export async function handleButtonClick() {
    const clientId = "6ae2cae9a6d944faaf54ab8f30dbc31b";
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");

    console.log("Before redirect or token retrieval");

    if (!code) {
        await redirectToAuthCodeFlow(clientId);

    } else {
        const accessToken = await getAccessToken(clientId, code);
        const profile = await fetchProfile(accessToken);
        console.log(accessToken);
        console.log(profile);
        // Optionally, you can update the UI with the profile data
        populateUI(profile);
    }

    console.log("After redirect or token retrieval");
}


export async function redirectToAuthCodeFlow(clientId) {
    const verifier = generateCodeVerifier(128);
    const challenge = await generateCodeChallenge(verifier);

    localStorage.setItem("verifier", verifier);

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("response_type", "code");
    params.append("redirect_uri", "http://localhost:3000");
    params.append("scope", "user-read-private user-read-email");
    params.append("code_challenge_method", "S256");
    params.append("code_challenge", challenge);

    window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
}

function generateCodeVerifier(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
}


export async function getAccessToken(clientId, code) {
    const verifier = localStorage.getItem("verifier");

    const params = new URLSearchParams();
    params.append("client_id", clientId);
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000");
    params.append("code_verifier", verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: params
    });

    const {access_token} = await result.json();
    return access_token;
}

export async function fetchProfile(token: string): Promise<any> {
    const result = await fetch("https://api.spotify.com/v1/me/playlists", {
        method: "GET", headers: {Authorization: `Bearer ${token}`}
    });

    return await result.json();
}

const useSpotifyAuthentication = () => {
    const [token, setToken] = useState("");

    useEffect(() => {
        const handleAuthentication = async () => {
            const hash = window.location.hash;
            let storedToken = window.localStorage.getItem("token");

            if (!storedToken && hash) {
                storedToken = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

                window.location.hash = "";
                window.localStorage.setItem("token", storedToken);
                const profile = await fetchProfile(storedToken);
                console.log(profile);
            }

            setToken(storedToken);
        };

        handleAuthentication();


        // Set up token refreshing every 50 minutes
        // const refreshInterval = 50 * 60 * 1000; // 50 minutes in milliseconds
        // const refreshTimer = setInterval(async () => {
        //     const newToken = await refreshAccessToken();
        //     setToken(newToken);
        // }, refreshInterval);
        //
        // // Clean up the interval when the component is unmounted
        // return () => clearInterval(refreshTimer);

    }, []);

    const logout = () => {
        setToken("");
        window.localStorage.removeItem("token");
    };

    return {token, logout};
};


const refreshAccessToken = async () => {
    //TODO: add refresh access token function

    // Implement the logic to refresh the access token
    // Replace the following line with your actual implementation
    //const refreshedToken = "new_access_token";
    //window.localStorage.setItem("token", refreshedToken);
    //return refreshedToken;
};

export default useSpotifyAuthentication;

// Assuming `tester` is a function you have defined elsewhere in your code
// const tester = (token) => { /* Your implementation */ };


function populateUI(profile) {
    // TODO: Update UI with profile data
}

async function getAudioDuration(ipfsLink: string) {
    return new Promise((resolve, reject) => {

        console.log(ipfsLink)
        // Create an audio element
        const audio = new Audio();

        // Set the source to the IPFS link
        audio.src = ipfsLink;

        // Wait for the metadata to load
        audio.addEventListener('loadedmetadata', () => {
            // Return the duration in seconds
            resolve(audio.duration);
        });

        // Handle errors
        audio.addEventListener('error', (e) => {
            reject(`Error loading audio: ${e.message}`);
        });
    });
}

export default getAudioDuration;
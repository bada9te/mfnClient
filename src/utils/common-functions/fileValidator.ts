export const acceptableImages = ["image/jpg", "image/jpeg", "image/png"];
export const acceptableAudios = ["audio/mp3", "audio/wav", "audio/mpeg"];


export default function validateFile(file: File, maxSizeInMib: number) {
    if (file.size > maxSizeInMib * 1024 * 1024) {
        return `File size must be lower than, ${maxSizeInMib}`;
    }
    console.log(file);

    if (!acceptableImages.includes(file.type) && !acceptableAudios.includes(file.type)) {
        return `${file.type} is not aceptable file type`;
    }

    return null;
};
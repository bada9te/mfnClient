export const acceptableImages = ["jpg", "jpeg", "png"];
export const acceptableAudios = ["mp3", "wav"];


export default function validateFile(file: File, maxSizeInMib: number) {
    if (file.size > maxSizeInMib * 1024 * 1024) {
        return `File size must be lower than, ${maxSizeInMib}`;
    }

    const fileNameSplittedWithDot = file.name.split('.');
    const extension = fileNameSplittedWithDot[fileNameSplittedWithDot.length - 1];

    if (!acceptableImages.includes(extension) || !acceptableAudios.includes(extension)) {
        return `${extension} is not aceptable file type`;
    }

    return null;
};
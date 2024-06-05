const getFileExtension = (filename: string) => {
    return filename.slice(filename.lastIndexOf('.'), filename.length);
}

export default getFileExtension;
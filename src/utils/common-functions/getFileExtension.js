const getFileExtension = (filename) => {
    return filename.slice(filename.lastIndexOf('.'), filename.length);
}

export default getFileExtension;
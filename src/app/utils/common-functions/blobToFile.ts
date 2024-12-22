export interface IBlob extends Blob {
    lastModified: number;
    name: string;
}

const blobToFile = (theBlob: IBlob, fileName: string) => {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModified = new Date().getTime();
    theBlob.name = fileName;
    return theBlob;
}

export default blobToFile;
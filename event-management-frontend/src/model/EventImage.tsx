export interface EventImage {
    id: string,
    name: string,
    byteArr: any,
    deleted?: boolean, // the image was deleted
    file?: File // the images was added now
}
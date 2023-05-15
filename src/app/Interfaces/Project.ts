export interface Project {
    id?: number,
    titulo: string,
    parrafo: string,
    lenguajes: {nombre: string}[],
    linkGit: string,
    linkPag: string,
    imagen: {
        nombre: string,
        tipo: string,
        base64?: Uint8Array
    }
}
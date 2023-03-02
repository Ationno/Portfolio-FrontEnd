export interface Project {
    id?: number,
    titulo: string,
    parrafo: string,
    lenguajes: string[],
    linkGit: string,
    linkPag: string,
    img: {
        titulo: string,
        tipo: string,
        base64?: string
    }
}
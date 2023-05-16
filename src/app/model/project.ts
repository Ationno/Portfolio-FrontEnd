export class Project {
    id?: number;
    titulo!: string;
    parrafo!: string;
    linkGit!: string;
    linkPag!: string;
    imagen!: {
        nombre: string,
        tipo: string,
        base64?: Uint8Array
    }
    lenguajes!: {nombre: string}[];

    constructor(titulo: string, parrafo: string, lenguajes: {nombre: string}[], linkGit: string, linkPag: string, imagen: {nombre: string, tipo: string, base64?: Uint8Array}) {
        this.titulo = titulo;
        this.parrafo = parrafo;
        this.lenguajes = lenguajes;
        this.linkGit = linkGit;
        this.linkPag = linkPag;
        this.imagen = imagen;
    }
}

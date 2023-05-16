export class About {
    id!: number;
    parrafo!: string;
    imagen!: {
        nombre: string;
        tipo: string;
        base64?: Uint8Array;
    };

    constructor (parrafo: string, imagen: {nombre: string, tipo: string, base64: Uint8Array}) {
        this.parrafo = parrafo;
        this.imagen = imagen;
    }
}
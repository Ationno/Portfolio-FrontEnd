export interface Experience {
    id?: number,
    titulo: string,
    empresa: {
        nombre: string
    },
    fechaInicio: Date,
    fechaFin: Date
    aprendizajes: {parrafo: string}[],
    imagen: {
        nombre: string,
        tipo: string,
        base64?: Uint8Array
    }
}
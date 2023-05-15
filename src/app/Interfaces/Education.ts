export interface Education {
    id?: number,
    titulo: string,
    institucion: {
        nombre: string
    },
    fechaInicio: Date,
    fechaFin: Date,
    imagen: {
        nombre: string,
        tipo: string,
        base64?: Uint8Array
    }
}   
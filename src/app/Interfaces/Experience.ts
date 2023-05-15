export interface Experience {
    id?: number,
    titulo: string,
    empresa: string,
    fechaInicio: string,
    fechaFin: string
    aprendizajes: string[],
    img: {
        titulo: string,
        tipo: string,
        base64?: string
    }
}
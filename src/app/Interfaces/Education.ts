export interface Education {
    id?: number,
    titulo: string,
    institucion: string,
    periodo: {
        inicio: string,
        fin: string
    },
    img: {
        titulo: string,
        tipo: string,
        base64?: string
    }
}   
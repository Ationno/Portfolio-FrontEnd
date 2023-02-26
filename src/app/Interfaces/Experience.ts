export interface Experience {
    id?: number,
    titulo: string,
    empresa: string,
    periodo: {
        inicio: string,
        fin: string
    },
    aprendizajes: string[],
    img: {
        titulo: string,
        tipo: string,
        base64?: string
    }
}
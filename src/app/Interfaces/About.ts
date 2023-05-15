export interface About {
    id: number,
    parrafo: string,
    imagen: {
        nombre: string,
        tipo: string,
        base64?: Uint8Array
    }
}
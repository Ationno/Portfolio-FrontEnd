export class Experience {
    id?: number;
    titulo!: string;
    empresa!: {
        nombre: string
    };
    fechaInicio!: Date;
    fechaFin!: Date
    aprendizajes!: {parrafo: string}[];
    imagen!: {
        nombre: string,
        tipo: string,
        base64?: Uint8Array
    }

    constructor(titulo: string, empresa: {nombre: string}, fechaInicio: Date, fechaFin: Date, aprendizajes: {parrafo: string}[], imagen: {nombre: string ,tipo: string, base64: Uint8Array}) {
        this.titulo = titulo;
        this.empresa = empresa;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.aprendizajes = aprendizajes; 
        this.imagen = imagen;
    }
}

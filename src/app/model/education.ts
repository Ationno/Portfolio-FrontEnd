export class Education {
    id?: number;
    titulo!: string;
    institucion!: {
        nombre: string;
    };
    fechaInicio!: Date;
    fechaFin!: Date;
    imagen!: {
        nombre: string;
        tipo: string;
        base64?: Uint8Array;
    }

    constructor(titulo: string, institucion: {nombre: string}, fechaInicio: Date, fechaFin: Date, imagen: {nombre: string, tipo: string, base64: Uint8Array}) {
        this.titulo = titulo;
        this.institucion = institucion;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
        this.imagen = imagen;
    }
}

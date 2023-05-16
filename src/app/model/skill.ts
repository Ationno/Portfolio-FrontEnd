export class Skill {
    id?: number;
    titulo!:string;
    parrafo!:string;
    porcentaje!:number;
    tipo!: number;

    constructor(titulo:string, parrafo:string, porcentaje:number, tipo: number) {
        this.titulo = titulo;
        this.parrafo = parrafo;
        this.porcentaje = porcentaje;
        this.tipo = tipo;
    }
}

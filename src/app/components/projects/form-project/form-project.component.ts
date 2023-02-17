import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/Project';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-form-project',
	templateUrl: './form-project.component.html',
	styleUrls: ['./form-project.component.css']
})
export class FormProjectComponent {
	@Output() onAddProject: EventEmitter<Project> = new EventEmitter();
	@Output() onEditProject: EventEmitter<Project> = new EventEmitter();
	@Output() toggleAddProject: EventEmitter<Event> = new EventEmitter();
	@Input() titulo: string = "";
	@Input() parrafo: string = "";
	@Input() lenguajes: string[] = [];
	@Input() linkGit: string = "";
	@Input() linkPag: string = "";
	@Input() img: {titulo: string, tipo: string, base64?: string} = {titulo: "", tipo: "", base64: ""};
	@Input() id?: number = 0;
	lenguaje: string = "";
	eleccion: string = "Soft";
	showAddProject: boolean = false;
	showEdit: boolean = false;
	showEleccion : boolean = true;
	subscriptionAdd?: Subscription;
	subscriptionEdit?: Subscription;

	constructor(
		private uiService: UiService
	) {
		this.subscriptionAdd = this.uiService.onToggleAddProject().subscribe( value => this.showAddProject = value );
		this.subscriptionEdit = this.uiService.onToggleEdit().subscribe( value => this.showEdit = value );
	}
	
	private securityProject(): boolean {
		if (!this.titulo) {
			alert("Agregar titulo")
			return false
		} else if (!this.parrafo) {
			alert("Agregar parrafo")
			return false
		} else if (this.lenguajes.length == 0) {
			alert("Colocar al menos un lenguaje")
			return false
		} else if (!this.linkGit) {
			alert("Agregar link GitHub del proyecto")
		} else if (!this.img) {
			alert("Agregar Imagen")
		}
		return true
	}

	private resetVariables():void {
		this.titulo = ""
		this.parrafo = ""
		this.lenguajes = []
		this.linkGit = ""
		this.linkPag = ""
		this.img = {titulo: "", tipo: "", base64: ""}
		this.lenguaje = ""
	}

	public add(): void {
		const {titulo, parrafo, lenguajes, linkGit, linkPag, img} = this
		const newProject = {titulo, parrafo, lenguajes, linkGit, linkPag, img}
		if (this.securityProject()) {
			this.onAddProject.emit(newProject);
			this.toggleAddProject.emit();
			this.resetVariables();
		} else
			return
	}

	public edit(): void {
		const {titulo, parrafo, lenguajes, linkGit, linkPag, img, id} = this
		const newProject = {titulo, parrafo, lenguajes, linkGit, linkPag, img, id}
		if (this.securityProject()) {
			this.onEditProject.emit(newProject);
			this.toggleAddProject.emit();
			this.resetVariables();
		} else
			return
	}

	public cerrar(): void {
		this.toggleAddProject.emit();
		this.resetVariables();
	}

	public agregarLenguaje(): void {
		if (this.lenguajes.length<10) {
			this.lenguajes.push(this.lenguaje)
			this.lenguaje = ""
		}
	}

	public eliminarLenguaje(lenguaje: string): void {
		this.lenguajes = this.lenguajes.filter( ele => ele !== lenguaje )
	}

	public onFileSelected(event: any) {
        const file:File = event.target.files[0];
		const reader = new FileReader;
        if (file) {
			reader.readAsDataURL(file);
    		reader.onload = () => {
				this.img.base64 = reader.result?.toString().split(',')[1];
    		};
			this.img.titulo = file.name;
			this.img.tipo = file.type.split('/')[1];
        }
    }
}
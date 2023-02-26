import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/Interfaces/Experience';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-form-experience',
	templateUrl: './form-experience.component.html',
	styleUrls: ['./form-experience.component.css']
})
export class FormExperienceComponent {
	@Output() onAddExperience: EventEmitter<Experience> = new EventEmitter();
	@Output() onEditExperience: EventEmitter<Experience> = new EventEmitter();
	@Output() toggleAddExperience: EventEmitter<Event> = new EventEmitter();
	@Input() titulo: string = "";
	@Input() empresa: string = "";
	@Input() aprendizajes: string[] = [];
	@Input() periodo: {inicio: string, fin: string} = {inicio:"", fin:""};
	@Input() img: {titulo: string, tipo: string, base64?: string} = {titulo: "", tipo: "", base64: ""};
	@Input() id?: number = 0;
	aprendizaje: string = "";
	showAddExperience: boolean = false;
	showEdit: boolean = false;
	subscriptionAdd?: Subscription;
	subscriptionEdit?: Subscription;

	constructor(
		private uiService: UiService
	) {
		this.subscriptionAdd = this.uiService.onToggleAddExperience().subscribe( value => this.showAddExperience = value );
		this.subscriptionEdit = this.uiService.onToggleEdit().subscribe( value => this.showEdit = value );
	}
	
	private securityExperience(): boolean {
		if (!this.titulo) {
			alert("Agregar titulo")
			return false
		} else if (!this.empresa) {
			alert("Agregar empresa")
			return false
		} else if (this.aprendizajes.length == 0) {
			alert("Colocar al menos un aprendizaje")
			return false
		} else if (!this.img) {
			alert("Agregar Imagen")
			return false
		}
		return true
	}

	private resetVariables():void {
		this.titulo = ""
		this.empresa = ""
		this.aprendizajes = []
		this.periodo = {inicio:"", fin:""}
		this.img = {titulo: "", tipo: "", base64: ""}
		this.aprendizaje = ""
	}

	public add(): void {
		const {titulo, empresa, aprendizajes, periodo, img} = this
		const newExperience = {titulo, empresa, aprendizajes, periodo, img}
		if (this.securityExperience()) {
			this.onAddExperience.emit(newExperience);
			this.toggleAddExperience.emit();
			this.resetVariables();
		} else
			return
	}

	public edit(): void {
		const {titulo, empresa, aprendizajes, periodo, img, id} = this
		const newExperience = {titulo, empresa, aprendizajes, periodo, img, id}
		if (this.securityExperience()) {
			this.onEditExperience.emit(newExperience);
			this.toggleAddExperience.emit();
			this.resetVariables();
		} else
			return
	}

	public cerrar(): void {
		this.toggleAddExperience.emit();
		this.resetVariables();
	}

	public agregarAprendizaje(): void {
		if (this.aprendizajes.length<10) {
			this.aprendizajes.push(this.aprendizaje)
			this.aprendizaje = ""
		}
	}

	public eliminarAprendizaje(aprendizaje: string): void {
		this.aprendizajes = this.aprendizajes.filter( ele => ele !== aprendizaje )
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

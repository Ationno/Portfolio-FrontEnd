import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Education } from 'src/app/Interfaces/Education';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-form-education',
	templateUrl: './form-education.component.html',
	styleUrls: ['./form-education.component.css']
})
export class FormEducationComponent {
	@Output() onAddEducation: EventEmitter<Education> = new EventEmitter();
	@Output() onEditEducation: EventEmitter<Education> = new EventEmitter();
	@Output() toggleAddEducation: EventEmitter<Event> = new EventEmitter();
	@Input() titulo: string = "";
	@Input() institucion: string = "";
	@Input() periodo: {inicio: string, fin: string} = {inicio:"", fin:""};
	@Input() img: {titulo: string, tipo: string, base64?: string} = {titulo: "", tipo: "", base64: ""};
	@Input() id?: number = 0;
	showAddEducation: boolean = false;
	showEdit: boolean = false;
	subscriptionAdd?: Subscription;
	subscriptionEdit?: Subscription;

	constructor(
		private uiService: UiService
	) {
		this.subscriptionAdd = this.uiService.onToggleAddEducation().subscribe( value => this.showAddEducation = value );
		this.subscriptionEdit = this.uiService.onToggleEdit().subscribe( value => this.showEdit = value );
	}
	
	private securityEducation(): boolean {
		if (!this.titulo) {
			alert("Agregar titulo")
			return false
		} else if (!this.institucion) {
			alert("Agregar parrafo")
			return false
		} else if (!this.periodo) {
			alert("Agregar link GitHub del proyecto")
		} else if (!this.img) {
			alert("Agregar Imagen")
		}
		return true
	}

	private resetVariables():void {
		this.titulo = ""
		this.institucion = ""
		this.periodo = {inicio:"", fin:""}
		this.img = {titulo: "", tipo: "", base64: ""}
	}

	public add(): void {
		const {titulo, institucion, periodo, img} = this
		const newEducation = {titulo,  institucion, periodo, img}
		if (this.securityEducation()) {
			this.onAddEducation.emit(newEducation);
			this.toggleAddEducation.emit();
			this.resetVariables();
		} else
			return
	}

	public edit(): void {
		const {titulo, institucion, periodo, img, id} = this
		const newEducation = {titulo,  institucion, periodo, img, id}
		if (this.securityEducation()) {
			this.onEditEducation.emit(newEducation);
			this.toggleAddEducation.emit();
			this.resetVariables();
		} else
			return
	}

	public cerrar(): void {
		this.toggleAddEducation.emit();
		this.resetVariables();
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

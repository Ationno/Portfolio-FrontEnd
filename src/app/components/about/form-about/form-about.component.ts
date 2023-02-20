import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { About } from 'src/app/Interfaces/About';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-form-about',
	templateUrl: './form-about.component.html',
	styleUrls: ['./form-about.component.css']
})
export class FormAboutComponent {
	@Output() onEditAbout: EventEmitter<About> = new EventEmitter();
	@Output() toggleEditAbout: EventEmitter<Event> = new EventEmitter();
	@Input() parrafo: string = "";
	@Input() img: {titulo: string, tipo: string, base64?: string} = {titulo: "", tipo: "", base64: ""};
	@Input() id?: number = 0;
	showEditAbout: boolean = false;
	showEdit: boolean = false;
	subscriptionEdit?: Subscription;

	constructor(
		private uiService: UiService
	) {
		this.subscriptionEdit = this.uiService.onToggleEditAbout().subscribe( value => this.showEditAbout = value );
	}
	
	private securityAbout(): boolean {
		if (!this.parrafo) {
			alert("Agregar titulo")
			return false
		} else if (!this.img) {
			alert("Agregar Imagen")
		}
		return true
	}

	public edit(): void {
		const {parrafo, img, id} = this
		const newAbout = {parrafo, img, id};
		if (this.securityAbout()) {
			this.onEditAbout.emit(newAbout);
			this.toggleEditAbout.emit();
		} else
			return
	}

	public cerrar(): void {
		this.toggleEditAbout.emit();
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

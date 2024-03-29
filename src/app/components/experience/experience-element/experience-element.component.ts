import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Experience } from 'src/app/Interfaces/Experience';
import { TokenService } from 'src/app/service/token.service';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-experience-element',
	templateUrl: './experience-element.component.html',
	styleUrls: ['./experience-element.component.css']
})
export class ExperienceElementComponent {
	@Input() experience: Experience = {titulo: "", empresa: {nombre: ""}, fechaInicio: new Date(), fechaFin: new Date(), aprendizajes: [], imagen: {nombre: "", tipo: ""}};
	@Output() onDeleteExperience: EventEmitter<Experience> = new EventEmitter();
	@Output() onEditExperience: EventEmitter<Experience> = new EventEmitter();
	imageSource: any;
	inicio: Date = new Date();
	fin: Date = new Date();
	isLogged = false;

	constructor( 
		private uiService: UiService,
		public sanitizer: DomSanitizer,
		private tokenService: TokenService
	) {}

	ngOnInit() {
		this.isLogged = this.tokenService.getToken() != null;
	}

	ngOnChanges() : void {
		this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.experience.imagen.base64}`);
		this.inicio = new Date(this.experience.fechaInicio);
		this.fin = new Date(this.experience.fechaFin);
	}

	public onDelete(experience: Experience) {
		this.onDeleteExperience.emit(experience);
	}

	public onEdit(experience: Experience) {
		this.onEditExperience.emit(experience);
		this.uiService.toggleFormExperience();
	}

	public getDate(): string {
		return this.inicio.toLocaleString("es-ES", { month: "long"})[0].toUpperCase() + this.inicio.toLocaleString("es-ES", { month: "long"}).slice(1) 
            + " " + this.inicio.getFullYear() + " - " + 
            this.fin.toLocaleString("es-ES", { month: "long"})[0].toUpperCase() + this.fin.toLocaleString("es-ES", { month: "long"}).slice(1) + " " + this.fin.getFullYear();
	}
}

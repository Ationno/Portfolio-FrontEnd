import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Education } from 'src/app/Interfaces/Education';
import { TokenService } from 'src/app/service/token.service';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-education-element',
	templateUrl: './education-element.component.html',
	styleUrls: ['./education-element.component.css']
})
export class EducationElementComponent {
	@Input() education: Education = {titulo: "", institucion: {nombre: ""}, fechaInicio: new Date(), fechaFin: new Date(), imagen: {nombre: "", tipo: ""}};
	@Output() onDeleteEducation: EventEmitter<Education> = new EventEmitter();
	@Output() onEditEducation: EventEmitter<Education> = new EventEmitter();
	inicio: Date = new Date();
	fin: Date = new Date();
	imageSource: any;
	isLogged = false;

	constructor( 
		private uiService: UiService,
		private sanitizer: DomSanitizer,
		private tokenService: TokenService
	) {}

	ngOnInit() : void {
		this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.education.imagen.base64}`);
		this.inicio = new Date(this.education.fechaInicio);
		this.fin = new Date(this.education.fechaFin);
		this.isLogged = this.tokenService.getToken() != null;
	}

	public onDelete(education: Education) {
		this.onDeleteEducation.emit(education);
	}

	public onEdit(education: Education) {
		this.onEditEducation.emit(education);
		this.uiService.toggleFormEducation();
	}

	public getDate(): string {
		return this.inicio.toLocaleString("es-ES", { month: "long"})[0].toUpperCase() + this.inicio.toLocaleString("es-ES", { month: "long"}).slice(1) 
            + " " + this.inicio.getFullYear() + " - " + 
            this.fin.toLocaleString("es-ES", { month: "long"})[0].toUpperCase() + this.fin.toLocaleString("es-ES", { month: "long"}).slice(1) + " " + this.fin.getFullYear();
	}
}

import { Component, EventEmitter, Input, Output, SimpleChange } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Experience } from 'src/app/Interfaces/Experience';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-experience-element',
	templateUrl: './experience-element.component.html',
	styleUrls: ['./experience-element.component.css']
})
export class ExperienceElementComponent {
	@Input() experience: Experience = {id: 0, titulo: "", empresa: "", periodo: {inicio: "", fin: ""}, aprendizajes: [""], img: {titulo: "", tipo: "", base64: ""}};
	@Output() onDeleteExperience: EventEmitter<Experience> = new EventEmitter();
	@Output() onEditExperience: EventEmitter<Experience> = new EventEmitter();
	imageSource: any;
	inicio: Date = new Date();
	fin: Date = new Date();

	constructor( 
		private uiService: UiService,
		public sanitizer: DomSanitizer
	) {}

	ngOnChanges() : void {
		this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.experience.img.base64}`);
		this.inicio = new Date(this.experience.periodo.inicio);
		this.fin = new Date(this.experience.periodo.fin);
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

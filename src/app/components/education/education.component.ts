import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Education } from 'src/app/Interfaces/Education';
import { EducationService } from 'src/app/service/education.service';
import { TokenService } from 'src/app/service/token.service';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-education',
	templateUrl: './education.component.html',
	styleUrls: ['./education.component.css']
})


export class EducationComponent {
	educations : Education[] = [];
	education: Education = {titulo: "", institucion: {nombre: ""}, fechaInicio: new Date(), fechaFin: new Date(), imagen: {nombre: "", tipo: ""}};
	subscription?: Subscription;
	editar: boolean = false;
	isLogged = false;

	constructor(
		private educationService: EducationService,
		private uiService: UiService,
		private tokenService: TokenService
	) {}

	ngOnInit() {
		this.educationService.get().subscribe((educations) => {	
			this.educations = educations
		})
		this.isLogged = this.tokenService.getToken() != null;
	}
	
	public toggleFormEducation() {
		this.uiService.toggleFormEducation();
		this.education = {titulo: "", institucion: {nombre: ""}, fechaInicio: new Date(), fechaFin: new Date(), imagen: {nombre: "", tipo: ""}};
	}

	public deleteEducation(education: Education) {
		this.educationService.delete(education.id!).subscribe(() => {
			this.educations = this.educations.filter( ele => ele.id !== education.id )
		})
	}

	public editEducation(education: Education) {
		this.educationService.edit(education).subscribe(() => {
			let i: number = this.educations.findIndex(ele => ele.id == education.id);
			this.educations[i] = education;
			this.ngOnInit()
		})
	}

	public addEducation(education: Education) {
		this.educationService.save(education).subscribe(() => {
			this.educations.push(education)
			this.ngOnInit()
		});
	}

	public editFormEducation(education: Education) {
		this.education = education;
	}
}

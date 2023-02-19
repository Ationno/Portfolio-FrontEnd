import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Education } from 'src/app/Interfaces/Education';
import { EducationService } from 'src/app/service/education.service';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-education',
	templateUrl: './education.component.html',
	styleUrls: ['./education.component.css']
})


export class EducationComponent {
	educations : Education[] = [];
	showAddEducation: boolean = false;
	subscription?: Subscription;
	editar: boolean = false;
	educationEdit: Education = {id: 0, titulo: "", institucion: "", periodo: {inicio: "", fin: ""}, img: {titulo: "", tipo: "", base64:""}};

	constructor(
		private educationService: EducationService,
		private uiService: UiService,
	) {}

	ngOnInit() {
		this.educationService.get().subscribe((educations) => {	
			this.educations = educations
		})
		this.subscription = this.uiService.onToggleAddEducation().subscribe( value => this.showAddEducation = value );
	}
	
	public toggleAddEducation() {
		this.educationEdit = {id: 0, titulo: "", institucion: "", periodo: {inicio:"", fin:""}, img: {titulo: "", tipo: "", base64:""}};
		this.uiService.toggleEdit(false);
		this.uiService.toggleAddEducation();
	}

	public deleteEducation(education: Education) {
		this.educationService.delete(education).subscribe(() => {
			this.educations = this.educations.filter( ele => ele.id !== education.id )
		})
	}

	public editEducation(education: Education) {
		this.educationService.edit(education).subscribe(() => {
			let i: number = this.educations.findIndex(ele => ele.id == education.id);
			this.educations[i] = education;
		})
	}

	public addEducation(education: Education) {
		this.educationService.add(education).subscribe((education: Education) => {
			this.educations.push(education)
		});
	}

	public editToFormEducation(education: Education) {
		this.educationEdit = education;
	}
	

}

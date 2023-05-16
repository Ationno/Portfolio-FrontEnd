import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/Interfaces/Experience';
import { ExperienceService } from 'src/app/service/experience.service';
import { TokenService } from 'src/app/service/token.service';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-experience',
	templateUrl: './experience.component.html',
	styleUrls: ['./experience.component.css']
})
export class ExperienceComponent {
	experiences : Experience[] = [];
	noExperience: boolean = false;
	subscription?: Subscription;
	experienceEdit: Experience = {titulo: "", empresa: {nombre: ""}, fechaInicio: new Date(), fechaFin: new Date(), aprendizajes: [], imagen: {nombre: "", tipo: ""}};
	experienceChosen: Experience = {titulo: "", empresa: {nombre: ""}, fechaInicio: new Date(), fechaFin: new Date(), aprendizajes: [], imagen: {nombre: "", tipo: ""}};
	clicked: boolean = false;
	isLogged = false;

	constructor(
		private experienceService: ExperienceService,
		private uiService: UiService,
		private tokenService: TokenService
	) {}

	ngOnInit() {
		this.experienceService.get().subscribe((experiences) => {	
			this.experiences = experiences
			if (experiences.length > 0) {
				this.experienceChosen = experiences[0]
				this.noExperience = false;
			} else {
				this.experienceChosen = {titulo: "", empresa: {nombre: ""}, fechaInicio: new Date(), fechaFin: new Date(), aprendizajes: [], imagen: {nombre: "", tipo: ""}};
				this.noExperience = true;
			}
		})
		this.isLogged = this.tokenService.getToken() != null;
	}

	public choseExperience(empresa: string): void {
		this.experienceChosen = this.experiences.filter( ele => ele.empresa.nombre === empresa )[0];
	}
	
	public toggleFormExperience() {
		this.uiService.toggleFormExperience();
		this.experienceEdit = {titulo: "", empresa: {nombre: ""}, fechaInicio: new Date(), fechaFin: new Date(), aprendizajes: [], imagen: {nombre: "", tipo: ""}};
	}

	public deleteExperience(experience: Experience) {
		this.experienceService.delete(experience.id!).subscribe(() => {
			if (this.experiences.length == 1) 
				this.noExperience = true;
			this.experiences = this.experiences.filter( ele => ele.id !== experience.id )
			if (this.experiences.length > 1 && experience.empresa === this.experienceChosen.empresa) 
				this.experienceChosen = this.experiences[0];
		})
	}

	public editExperience(experience: Experience) {
		this.experienceChosen = experience;
		this.experienceService.edit(experience).subscribe(() => {
			let i: number = this.experiences.findIndex(ele => ele.id == experience.id);
			this.experiences[i] = experience;
			this.ngOnInit()
		})
	}

	public addExperience(experience: Experience) {
		this.experienceService.save(experience).subscribe(() => {
			if (this.experiences.length == 0) { 
				this.noExperience = false;
			}
			this.experiences.push(experience)
			this.ngOnInit()
		});
	}

	public editFormExperience(experience: Experience) {
		this.experienceEdit = experience;
	}
}

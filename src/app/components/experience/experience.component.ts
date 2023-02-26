import { Component, Renderer2 ,RendererFactory2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/Interfaces/Experience';
import { ExperienceService } from 'src/app/service/experience.service';
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
	editar: boolean = false;
	experienceEdit: Experience = {id: 0, titulo: "", empresa: "", periodo: {inicio: "", fin: ""}, aprendizajes: [], img: {titulo: "", tipo: "", base64: ""}};
	experienceChosen: Experience = {id: 0, titulo: "", empresa: "", periodo: {inicio: "", fin: ""}, aprendizajes: [], img: {titulo: "", tipo: "", base64: ""}};
	clicked: boolean = false;
	private renderer: Renderer2;

	constructor(
		private experienceService: ExperienceService,
		private uiService: UiService,
		private rendererFactory: RendererFactory2
	) {
		this.renderer = rendererFactory.createRenderer(null, null)
	}

	ngOnInit() {
		this.experienceService.get().subscribe((experiences) => {	
			this.experiences = experiences
			if (experiences.length > 0) {
				this.experienceChosen = experiences[0]
				this.noExperience = false;
			} else {
				this.experienceChosen = {id: 0, titulo: "", empresa: "", periodo: {inicio: "", fin: ""}, aprendizajes: [], img: {titulo: "", tipo: "", base64: ""}};
				this.noExperience = true;
			}
		})
	}

	public choseExperience(empresa: string): void {
		this.experienceChosen = this.experiences.filter( ele => ele.empresa === empresa )[0];
		this.renderer.addClass(document.getElementsByClassName(empresa)[0], "clicked");
		this.experiences.forEach((elem) => {
			if (elem.empresa !== empresa)
			this.renderer.removeClass(document.getElementsByClassName(elem.empresa)[0], "clicked");
		})
	}
	
	public toggleAddExperience() {
		this.experienceEdit = {id: 0, titulo: "", empresa: "", periodo: {inicio: "", fin: ""}, aprendizajes: [], img: {titulo: "", tipo: "", base64: ""}};
		this.uiService.toggleEdit(false);
		this.uiService.toggleAddExperience();
	}

	public deleteExperience(experience: Experience) {
		this.experienceService.delete(experience).subscribe(() => {
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
		})
	}

	public addExperience(experience: Experience) {
		this.experienceService.add(experience).subscribe((experience: Experience) => {
			if (this.experiences.length == 0) { 
				this.noExperience = false;
			}
			this.experiences.push(experience)
		});
	}

	public editToFormExperience(experience: Experience) {
		this.experienceEdit = experience;
	}
}

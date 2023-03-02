import { Component } from '@angular/core';
import { UiService } from '../../service/ui.service';
import { Subscription } from 'rxjs';
import { SkillService } from "src/app/service/skill.service";
import { Skill } from '../../Interfaces/Skill';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
    skills : Skill[] = [];
	skillsSoft : Skill[] = [];
	skillsHard : Skill[] = [];
	subscription?: Subscription;
	editar: boolean = false;
	skill: Skill = {titulo: "", parrafo: "", porcentaje: 0, eleccion: ""};

    constructor(
		private skillService: SkillService,
		private uiService: UiService,
	) {}

	ngOnInit() {
		this.skillService.get().subscribe((skills) => {	
			this.skills = skills
		})
	}
	
	public toggleFormSkill() {
		this.skill = {titulo: "", parrafo: "", porcentaje: 0, eleccion: ""};
		this.uiService.toggleFormSkill();
	}

	public deleteSkill(skill: Skill) {
		this.skillService.delete(skill).subscribe(() => {
			this.skills = this.skills.filter( ele => ele.id !== skill.id )
		})
	}

	public editSkill(skill: Skill) {
		this.skillService.edit(skill).subscribe(() => {
			let i: number = this.skills.findIndex(ele => ele.id == skill.id);
			this.skills[i] = skill;
		})
	}

	public addSkill(skill: Skill) {
		this.skillService.add(skill).subscribe((skill: Skill) => {
			this.skills.push(skill)
		});
	}
	
	public getSoftSkills() : Skill[] {
		return this.skills.filter(elem => elem.eleccion === "Soft");
	}

	public getHardSkills() : Skill[] {
		return this.skills.filter(elem => elem.eleccion === "Hard");
	}

	public editFormSkill(skill: Skill) {
		this.skill = skill;
	}
	

}
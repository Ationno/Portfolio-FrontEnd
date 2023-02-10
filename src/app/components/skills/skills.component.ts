import { Component } from '@angular/core';
import { UiService } from '../../service/ui.service';
import { Subscription } from 'rxjs';
import { SkillService } from "src/app/service/skill.service";
import { Skill } from '../../Skill';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
    skills : Skill[] = [];
	skillsSoft : Skill[] = [];
	skillsHard : Skill[] = [];
    showAddSkill: boolean = false;
	subscription?: Subscription;
	editar: boolean = false;
	skillEdit: Skill = {id: 0, titulo: "", parrafo: "", porcentaje: 0, eleccion: ""};

    constructor(
		private skillService: SkillService,
		private uiService: UiService,
	) {}

	ngOnInit() {
		this.skillService.get().subscribe((skills) => {	
			this.skills = skills
		})
		this.subscription = this.uiService.onToggleAdd().subscribe( value => this.showAddSkill = value );
	}
	
	public toggleAddSkill() {
		this.skillEdit = {id: 0, titulo: "", parrafo: "", porcentaje: 0, eleccion: ""};
		this.uiService.toggleEdit(false);
		this.uiService.toggleAddSkill();
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

	public editToFormSkill(skill: Skill) {
		this.skillEdit = skill;
	}
	

}
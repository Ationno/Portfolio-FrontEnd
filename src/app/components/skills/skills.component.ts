import { Component } from '@angular/core';
import { UiService } from '../../service/ui.service';
import { SkillService } from "src/app/service/skill.service";
import { Skill } from 'src/app/Interfaces/Skill';
import { TokenService } from 'src/app/service/token.service';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
    skills : Skill[] = [];
	skillsSoft : Skill[] = [];
	skillsHard : Skill[] = [];
	skill: Skill = {titulo: "", parrafo: "", porcentaje: 0, tipo: 0};
	isLogged = false;

    constructor(
		private skillService: SkillService,
		private uiService: UiService,
		private tokenService: TokenService
	) {}

	ngOnInit() {
		this.skillService.get().subscribe((skills) => {	
			this.skills = skills
		})
		this.isLogged = this.tokenService.getToken() != null;
	}
	
	public toggleFormSkill() {
		this.skill = {titulo: "", parrafo: "", porcentaje: 0, tipo: 0};
		this.uiService.toggleFormSkill();
	}

	public addSkill(skill: Skill) {
		this.skillService.save(skill).subscribe((skillSubs: Skill) => {
			this.skills.push(skill)
		});
	}

	public deleteSkill(id:number){
		if(id != undefined){
	  		this.skillService.delete(id).subscribe(data => { this.skills = this.skills.filter( ele => ele.id !== id ) }, err =>{alert("no se pudo eliminar el estudio")
		})
	}}

	public editSkill(skill: Skill) {
		this.skillService.edit(skill).subscribe(() => {
			let i: number = this.skills.findIndex(ele => ele.id == skill.id);
			this.skills[i] = skill;
		})
	}
	
	public getSoftSkills() : Skill[] {
		return this.skills.filter(elem => elem != null && elem.tipo === 1);
	}

	public getHardSkills() : Skill[] {
		return this.skills.filter(elem => elem != null &&  elem.tipo === 0);
	}
	
	public editFormSkill(skill: Skill) {
		this.skill = skill;
	}

}
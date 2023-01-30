import { Component } from '@angular/core';
import { Skill } from '../../Skill';
import { SkillService } from '../../service/skill.service';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
	skills : Skill[] = [];

	constructor(
		private skillService: SkillService
	) {}

	ngOnInit() {
		this.skillService.getSkills().subscribe((skills) => {
			this.skills = skills;
		})
	}

	public deleteSkill(skill:Skill) {
		this.skillService.deleteSkill(skill).subscribe(() => {
			this.skills = this.skills.filter( ele => ele.id !== skill.id )
		})
	}
}

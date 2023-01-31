import { Component } from '@angular/core';
import { Skill } from '../../Skill';
import { SkillService } from '../../service/skill.service';
import { UiService } from '../../service/ui.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-skills',
	templateUrl: './skills.component.html',
	styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
	skills : Skill[] = [];
	showAddSkill: boolean = false;
	subscription?: Subscription;

	constructor(
		private skillService: SkillService,
		private uiService: UiService
	) {
		this.subscription = this.uiService.onToggle().subscribe( value => this.showAddSkill = value );
	}

	ngOnInit() {
		this.skillService.getSkills().subscribe((skills) => {
			this.skills = skills;
		})
	}

	public deleteSkill(skill: Skill) {
		this.skillService.deleteSkill(skill).subscribe(() => {
			this.skills = this.skills.filter( ele => ele.id !== skill.id )
		})
	}

	public addSkill(skill: Skill) {
		this.skillService.addTask(skill).subscribe((skill) => {
			this.skills.push(skill)
		});
	}

	public toggleAddSkill() {
		this.uiService.toggleAddSkill();
	}
}

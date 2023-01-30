import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Skill } from '../../../Skill';
import { SKILLS } from '../../../mock-skill';

@Component({
	selector: 'app-skill-element',
	templateUrl: './skill-element.component.html',
	styleUrls: ['./skill-element.component.css']
})
export class SkillElementComponent {
	@Input() skill: Skill = SKILLS[0]; 
	@Output() onDeleteSkill: EventEmitter<Skill> = new EventEmitter();
	
	ngOnInit() : void {}

	public onDelete(skill:Skill) {
		this.onDeleteSkill.emit(skill);
	}
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Skill } from '../../../Skill';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-skill-element',
	templateUrl: './skill-element.component.html',
	styleUrls: ['./skill-element.component.css']
})
export class SkillElementComponent {
	@Input() skill: Skill = { id:0, titulo: "", parrafo: "", porcentaje:0, eleccion:""}; 
	@Output() onDeleteSkill: EventEmitter<Skill> = new EventEmitter();
	@Output() onEditFormSkill: EventEmitter<Skill> = new EventEmitter();
	
	constructor( 
		private uiService: UiService
	) {}

	ngOnInit() : void {}

	public onDelete(skill:Skill) {
		this.onDeleteSkill.emit(skill);
	}

	public onEdit(skill:Skill) {
		this.onEditFormSkill.emit(skill);
		this.uiService.toggleEdit(true);
		this.uiService.toggleAddSkill();
	}
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Skill } from '../../../Interfaces/Skill';
import { UiService } from 'src/app/service/ui.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
	selector: 'app-skill-element',
	templateUrl: './skill-element.component.html',
	styleUrls: ['./skill-element.component.css']
})
export class SkillElementComponent {
	@Input() skill: Skill = { id:0, titulo: "", parrafo: "", porcentaje:0, tipo:0}; 
	@Output() onDeleteSkill: EventEmitter<Skill> = new EventEmitter();
	@Output() onEditFormSkill: EventEmitter<Skill> = new EventEmitter();
	isLogged = false;
	
	constructor( 
		private uiService: UiService,
		private tokenService: TokenService
	) {}

	ngOnInit() : void {
		this.isLogged = this.tokenService.getToken() != null;
	}

	public onDelete(skill:Skill) {
		this.onDeleteSkill.emit(skill);
	}

	public onEdit(skill:Skill) {
		this.onEditFormSkill.emit(skill);
		this.uiService.toggleFormSkill();
	}
}

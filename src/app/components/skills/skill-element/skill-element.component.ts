import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Skill } from '../../../Interfaces/Skill';
import { UiService } from 'src/app/service/ui.service';
import { TokenService } from 'src/app/service/token.service';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

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
	public showContainer!: boolean;
	radius: number = 50;
	stokeWidth: number = 12;
	titleFontSize: string = "2rem";
	unitsFontSize: string = "1.25rem";

	constructor( 
		private uiService: UiService,
		private tokenService: TokenService,
		public breakpointObserver: BreakpointObserver
	) {}

	ngOnInit() : void {
		this.isLogged = this.tokenService.getToken() != null;
		this.breakpointObserver.observe(['(max-width: 1000px)']).subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.radius = 15;
		  this.stokeWidth = 4;
		  this.titleFontSize = ".75rem"
		  this.unitsFontSize = ".50rem"
        } else {
          this.radius = 40;
		  this.stokeWidth = 10;
		  this.titleFontSize = "1.5rem";
		  this.unitsFontSize = "1rem";
        }
      });
	}

	public onDelete(skill:Skill) {
		this.onDeleteSkill.emit(skill);
	}

	public onEdit(skill:Skill) {
		this.onEditFormSkill.emit(skill);
		this.uiService.toggleFormSkill();
	}
}

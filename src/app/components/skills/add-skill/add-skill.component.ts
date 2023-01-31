import { Component, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs'; 
import { Skill } from '../../../Skill';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-add-skill',
	templateUrl: './add-skill.component.html',
	styleUrls: ['./add-skill.component.css']
})
export class AddSkillComponent {
	@Output() onAddSkill: EventEmitter<Skill> = new EventEmitter();
	titulo: string = "";
	parrafo: string = "";
	porcentaje: number = 0;
	showAddSkill: boolean = false;
	subscription?: Subscription;

	constructor(
		private uiService: UiService
	) {
		this.subscription = this.uiService.onToggle().subscribe( value => this.showAddSkill = value );
	}
	
	public onSubmit() {
		if (!this.titulo) {
			alert("Agregar titulo")
			return
		}
		const {titulo, parrafo, porcentaje} = this
		const newSkill = {titulo, parrafo, porcentaje}
		this.onAddSkill.emit(newSkill);
	}
}

import { Component, Output, Input, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs'; 
import { Skill } from '../../../Skill';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-form-skill',
	templateUrl: './form-skill.component.html',
	styleUrls: ['./form-skill.component.css']
})
export class FormSkillComponent {
	@Output() onAddSkill: EventEmitter<Skill> = new EventEmitter();
	@Output() onEditSkill: EventEmitter<Skill> = new EventEmitter();
	@Output() toggleAddSkill: EventEmitter<Event> = new EventEmitter();
	@Input() titulo: string = "";
	@Input() parrafo: string = "";
	@Input() porcentaje: number = 0;
	@Input() id?: number = 0;
	eleccion: string = "Soft";
	showAddSkill: boolean = false;
	showEdit: boolean = false;
	showEleccion : boolean = true;
	subscriptionAdd?: Subscription;
	subscriptionEdit?: Subscription;
	subscriptionEditSkill?: Subscription;

	constructor(
		private uiService: UiService
	) {
		this.subscriptionAdd = this.uiService.onToggleAdd().subscribe( value => this.showAddSkill = value );
		this.subscriptionEdit = this.uiService.onToggleEdit().subscribe( value => this.showEdit = value );
	}
	
	private securitySkill(): boolean {
		if (!this.titulo) {
			alert("Agregar titulo")
			return false
		} else if (!this.parrafo) {
			alert("Agregar parrafo")
			return false
		} else if (this.porcentaje<0 || this.porcentaje > 100) {
			alert("Colocar un valor valido en porcentaje")
			return false
		}
		return true
	}

	public add(): void {
		const {titulo, parrafo, porcentaje, eleccion} = this
		const newSkill = {titulo, parrafo, porcentaje, eleccion}
		this.toggleAddSkill.emit();
		if (this.securitySkill()) {
			this.onAddSkill.emit(newSkill);
			this.titulo = ""
			this.parrafo = ""
			this.porcentaje = 0
		} else
			return
	}

	public edit(): void {
		const {titulo, parrafo, porcentaje, eleccion, id} = this
		const newSkill = {titulo, parrafo, porcentaje, eleccion, id}
		this.toggleAddSkill.emit();
		if (this.securitySkill()) {
			this.onEditSkill.emit(newSkill);
			this.titulo = ""
			this.parrafo = ""
			this.porcentaje = 0
		} else
			return
	}
}

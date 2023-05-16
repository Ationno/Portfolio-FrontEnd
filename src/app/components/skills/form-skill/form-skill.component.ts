import { Component, Output, Input, EventEmitter, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs'; 
import { Skill } from '../../../Interfaces/Skill';
import { UiService } from 'src/app/service/ui.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-form-skill',
	templateUrl: './form-skill.component.html',
	styleUrls: ['./form-skill.component.css']
})
export class FormSkillComponent {
	@Output() onAddSkill: EventEmitter<Skill> = new EventEmitter();
	@Output() onEditSkill: EventEmitter<Skill> = new EventEmitter();
	@Output() onToggleFormSkill: EventEmitter<Event> = new EventEmitter();
	@Input() skill: Skill = {titulo: "", parrafo: "", porcentaje:0, tipo:0}; 
	showFormSkill: boolean = false;
	showEleccion : boolean = true;
	subscription?: Subscription;
	form: FormGroup;

	constructor(
		private uiService: UiService,
		private formBuilder: FormBuilder
	) {
		this.subscription = this.uiService.onToggleFormSkill().subscribe( value => this.showFormSkill = value );
		this.form = this.formBuilder.group({
			id: [],
			titulo: new FormControl('', {validators: Validators.required, updateOn: "blur"}),
			parrafo: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			porcentaje: new FormControl('', {validators: [Validators.required, Validators.min(0), Validators.max(100)], updateOn: 'blur'}),
			tipo: new FormControl('')
		})
	}
	
	ngOnChanges(changes: SimpleChanges) {
		if (changes['skill']?.currentValue) 
			this.form?.patchValue(this.skill);
	}

	get Titulo(){
		return this.form.get("titulo");
	}

	get Parrafo(){
		return this.form.get("parrafo");
	}
		
	get Porcentaje(){
		return this.form.get("porcentaje");	
	}

	public onClose(): void {
		this.onToggleFormSkill.emit();
		this.form.reset();
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.onAddSkill.emit(this.form.getRawValue());
			this.onToggleFormSkill.emit();
			this.form.reset()
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.onEditSkill.emit(this.form.getRawValue());
			this.onToggleFormSkill.emit();
			this.form.reset()
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}

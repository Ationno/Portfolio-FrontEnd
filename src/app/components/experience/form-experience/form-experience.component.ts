import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/Interfaces/Experience';
import { UiService } from 'src/app/service/ui.service';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
	selector: 'app-form-experience',
	templateUrl: './form-experience.component.html',
	styleUrls: ['./form-experience.component.css']
})
export class FormExperienceComponent {
	@Output() onAddExperience: EventEmitter<Experience> = new EventEmitter();
	@Output() onEditExperience: EventEmitter<Experience> = new EventEmitter();
	@Output() onToggleFormExperience: EventEmitter<Event> = new EventEmitter();
	@Input() experience: Experience = {titulo: "", empresa: {nombre: ""}, fechaInicio: new Date(), fechaFin: new Date(), aprendizajes: [{parrafo: ""}], imagen: {nombre: "", tipo: ""}};
	aprendizajes: {parrafo: string}[] = [];
	showFormExperience: boolean = false;
	subscription?: Subscription;
	form: FormGroup;

	constructor(
		private uiService: UiService,
		private formBuilder: FormBuilder
	) {
		this.subscription = this.uiService.onToggleFormExperience().subscribe( value => this.showFormExperience = value );
		this.form = this.formBuilder.group({
			id: [],
			titulo: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			empresa: this.formBuilder.group({
				nombre: new FormControl('', {validators: Validators.required, updateOn: 'blur'})
			}),
			fechaInicio: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			fechaFin: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			aprendizaje: new FormControl(""),
			aprendizajes: new FormControl([]),
			imagen: this.formBuilder.group({
				nombre: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
				tipo: new FormControl('', {updateOn: 'blur'}),
				base64: new FormControl('', {updateOn: 'blur'})
			})
		})
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['experience']?.currentValue)  {
			this.form?.patchValue(this.experience);
			this.aprendizajes = Object.assign([], this.form.get("aprendizajes")?.value);
			this.form.get("aprendizaje")?.setValue("")
		}
	}

	get Titulo(){
		return this.form.get("titulo");
	}

	get Empresa(){
		return this.form.get("empresa")?.get("nombre");
	}
		
	get Inicio(){
		return this.form.get("fechaInicio");	
	}

	get Fin(){
		return this.form.get("fechaFin");	
	}

	get Imagen(){
		return this.form.get("imagen")?.get("nombre");	
	}

	public onClose(): void {
		this.onToggleFormExperience.emit();
		this.form.reset();
	}

	public onAddAprendizaje(): void {
		if (this.aprendizajes.length<10) {
			this.aprendizajes.push({parrafo: this.form.get("aprendizaje")?.value})
			this.form.get("aprendizajes")?.setValue(Object.assign([], this.aprendizajes))
			this.form.get("aprendizaje")?.setValue("")
		}
	}

	public onDeleteAprendizaje(aprendizaje: string): void {
		this.aprendizajes = this.aprendizajes.filter( ele => ele.parrafo != aprendizaje)
		this.form.get("aprendizajes")?.setValue(Object.assign([], this.aprendizajes))
	}

	public onFileSelected(event: any) {
		const file:File = event.target.files[0];
		const reader = new FileReader;
		if (file) {
			reader.readAsDataURL(file);
				reader.onload = () => {
					this.form.patchValue({
						imagen: {
							nombre: file.name,
							tipo: file.type.split('/')[1],
							base64: reader.result?.toString().split(',')[1]
						}
					})
				};
		}
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.onAddExperience.emit(this.form.getRawValue());
			this.onToggleFormExperience.emit();
			this.form.reset()
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.onEditExperience.emit(this.form.getRawValue());
			this.onToggleFormExperience.emit();
			this.form.reset()
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}

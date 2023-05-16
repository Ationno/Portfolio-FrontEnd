import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Education } from 'src/app/Interfaces/Education';
import { UiService } from 'src/app/service/ui.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as byteBase64 from "byte-base64";

@Component({
	selector: 'app-form-education',
	templateUrl: './form-education.component.html',
	styleUrls: ['./form-education.component.css'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormEducationComponent {
	@Output() onAddEducation: EventEmitter<Education> = new EventEmitter();
	@Output() onEditEducation: EventEmitter<Education> = new EventEmitter();
	@Output() onToggleFormEducation: EventEmitter<Event> = new EventEmitter();
	@Input() education: Education = {titulo: "", institucion: {nombre: ""}, fechaInicio: new Date(), fechaFin: new Date(), imagen: {nombre: "", tipo: ""}};
	showFormEducation: boolean = false;
	subscription?: Subscription;
	form: FormGroup;
	dateInicio: Date = new Date();
	dateFin: Date = new Date();

	constructor(
		private uiService: UiService,
		private formBuilder: FormBuilder
	) {
		this.subscription = this.uiService.onToggleFormEducation().subscribe( value => this.showFormEducation = value );
		this.form = this.formBuilder.group({
			id: [],
			titulo: new FormControl('', {validators: Validators.required, updateOn: "blur"}),
			institucion: this.formBuilder.group ({
				nombre: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			}),
			fechaInicio: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			fechaFin: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			imagen: this.formBuilder.group({
				nombre: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
				tipo: new FormControl('', {updateOn: 'blur'}),
				base64: new FormControl('', {updateOn: 'blur'})
			})
		})
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['education']?.currentValue) {
			let dateInicio = new Date(this.education.fechaInicio);
			let dateFin = new Date(this.education.fechaFin);
			this.form?.patchValue(this.education);
			this.form?.patchValue({
				fechaInicio: dateInicio.getFullYear() + "-" + String(dateInicio.getMonth() + 1).padStart(2, '0') + "-" + String(dateInicio .getDate()).padStart(2, '0'),
				fechaFin: dateFin.getFullYear() + "-" + String(dateFin.getMonth() + 1).padStart(2, '0') + "-" + String(dateFin .getDate()).padStart(2, '0')
			})
		}
	}

	get Titulo(){
		return this.form.get("titulo");
	}

	get Institucion(){
		return this.form.get("institucion")?.get("nombre");
	}
		
	get FechaInicio(){
		return this.form.get("fechaInicio");	
	}

	get FechaFin(){
		return this.form.get("fechaFin");	
	}

	get Imagen(){
		return this.form.get("imagen")?.get("nombre");	
	}

	public onClose(): void {
		this.onToggleFormEducation.emit();
		this.form.reset();
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
						base64: Array.from(byteBase64.base64ToBytes(reader.result?.toString().split(',')[1]!))
					}
				})
			};
		}
	}

	public onAdd(): void {
		if (this.form.valid) {
			this.onAddEducation.emit(this.form.getRawValue());
			this.onToggleFormEducation.emit();
			this.form.reset()
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.onEditEducation.emit(this.form.getRawValue());
			this.onToggleFormEducation.emit();
			this.form.reset()
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}

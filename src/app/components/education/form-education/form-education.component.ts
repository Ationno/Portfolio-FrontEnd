import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { Education } from 'src/app/Interfaces/Education';
import { UiService } from 'src/app/service/ui.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
	@Input() education: Education = {titulo: "", institucion: "", periodo: {inicio: "", fin: ""}, img: {titulo: "", tipo: "", base64:""}};
	showFormEducation: boolean = false;
	subscription?: Subscription;
	form: FormGroup;

	constructor(
		private uiService: UiService,
		private formBuilder: FormBuilder
	) {
		this.subscription = this.uiService.onToggleFormEducation().subscribe( value => this.showFormEducation = value );
		this.form = this.formBuilder.group({
			id: [],
			titulo: new FormControl('', {validators: Validators.required, updateOn: "blur"}),
			institucion: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			periodo: this.formBuilder.group({
				inicio: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
				fin: new FormControl('', {validators: Validators.required, updateOn: 'blur'})
			}),
			img: this.formBuilder.group({
				titulo: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
				tipo: new FormControl('', {updateOn: 'blur'}),
				base64: new FormControl('', {updateOn: 'blur'})
			})
		})
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['education']?.currentValue) 
			this.form?.patchValue(this.education);
	}

	get Titulo(){
		return this.form.get("titulo");
	}

	get Institucion(){
		return this.form.get("institucion");
	}
		
	get Inicio(){
		return this.form.get("periodo")?.get("inicio");	
	}

	get Fin(){
		return this.form.get("periodo")?.get("fin");	
	}

	get Img(){
		return this.form.get("img")?.get("titulo");	
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
						img: {
							titulo: file.name,
							tipo: file.type.split('/')[1],
							base64: reader.result?.toString().split(',')[1]
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
			alert("Success!")
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
			alert("Success!")
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}

import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import { About } from 'src/app/Interfaces/About';
import { UiService } from 'src/app/service/ui.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as byteBase64 from "byte-base64";

@Component({
	selector: 'app-form-about',
	templateUrl: './form-about.component.html',
	styleUrls: ['./form-about.component.css']
})

export class FormAboutComponent {
	@Output() onSubmitAbout: EventEmitter<About> = new EventEmitter();
	@Output() onToggleFormAbout: EventEmitter<Event> = new EventEmitter();
	@Input() about: About = {id: 0, parrafo: "", imagen: {nombre: "", tipo: ""}};
	showAbout: boolean = false;
	subscription?: Subscription;
	form: FormGroup;

	constructor(
		private uiService: UiService,
		private formBuilder: FormBuilder
	) {
		this.subscription = this.uiService.onToggleFormAbout().subscribe( value => this.showAbout = value );
		this.form = this.formBuilder.group({
			id: [],
			parrafo: new FormControl('', {validators: Validators.required, updateOn: "blur"}),
			imagen: this.formBuilder.group({
				nombre: new FormControl('', {validators: Validators.required, updateOn: "blur"}),
				tipo: new FormControl('', {updateOn: "blur"}),
				base64: new FormControl('', {updateOn: "blur"})
			})
		})
	}
	
	get Parrafo(){
		return this.form.get("parrafo");
	}
		
	get Imagen(){
		return this.form.get("imagen")?.get("nombre");	
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['about']?.currentValue) {
		  this.form?.patchValue(this.about);
		}
	}

	public onClose(): void {
		this.onToggleFormAbout.emit();
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

	public submit(): void {
		if (this.form.valid){
			this.onSubmitAbout.emit(this.form.getRawValue());
			this.onToggleFormAbout.emit();
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}

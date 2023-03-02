import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Project } from 'src/app/Interfaces/Project';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-form-project',
	templateUrl: './form-project.component.html',
	styleUrls: ['./form-project.component.css']
})
export class FormProjectComponent {
	@Output() onAddProject: EventEmitter<Project> = new EventEmitter();
	@Output() onEditProject: EventEmitter<Project> = new EventEmitter();
	@Output() onToggleFormProject: EventEmitter<Event> = new EventEmitter();
	@Input() project: Project = {titulo: "", parrafo: "", lenguajes: [""], linkGit: "", linkPag: "", img: {titulo: "", tipo: "", base64: ""}};
	lenguajes: string[] = [];
	showFormProject: boolean = false;
	subscription?: Subscription;
	form: FormGroup;

	constructor(
		private uiService: UiService,
		private formBuilder: FormBuilder
	) {
		this.subscription = this.uiService.onToggleFormProject().subscribe( value => this.showFormProject = value );
		this.form = this.formBuilder.group({
			id: [],
			titulo: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			parrafo: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			linkGit: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			linkPag: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
			lenguaje: new FormControl(""),
			lenguajes: new FormControl([]),
			img: this.formBuilder.group({
				titulo: new FormControl('', {validators: Validators.required, updateOn: 'blur'}),
				tipo: new FormControl('', {updateOn: 'blur'}),
				base64: new FormControl('', {updateOn: 'blur'})
			})
		})
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['project']?.currentValue)  {
			this.form?.patchValue(this.project);
			this.lenguajes = Object.assign([], this.form.get("lenguajes")?.value);
			this.form.get("lenguaje")?.setValue("")
		}
	}

	get Titulo(){
		return this.form.get("titulo");
	}

	get Parrafo(){
		return this.form.get("parrafo");
	}
		
	get LinkGit(){
		return this.form.get("linkGit");
	}

	get LinkPag(){
		return this.form.get("linkPag");
	}

	get Img(){
		return this.form.get("img")?.get("titulo");	
	}

	public onClose(): void {
		this.onToggleFormProject.emit();
		this.form.reset();
	}

	public onAddLenguaje(): void {
		if (this.lenguajes.length<10) {
			this.lenguajes.push(this.form.get("lenguaje")?.value)
			this.form.get("lenguajes")?.setValue(Object.assign([], this.lenguajes))
			this.form.get("lenguaje")?.setValue("")
		}
	}

	public onDeleteLenguaje(lenguaje: string): void {
		this.lenguajes = this.lenguajes.filter( ele => ele != lenguaje)
		this.form.get("lenguajes")?.setValue(Object.assign([], this.lenguajes))
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
			this.onAddProject.emit(this.form.getRawValue());
			this.onToggleFormProject.emit();
			this.form.reset()
			alert("Success!")
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}

	public onEdit(): void {
		if (this.form.valid) {
			this.onEditProject.emit(this.form.getRawValue());
			this.onToggleFormProject.emit();
			this.form.reset()
			alert("Success!")
		} else {
			console.log(this.form.errors)
			this.form.markAllAsTouched();
		}
	}
}
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UiService } from 'src/app/service/ui.service';
import { Project } from '../../../Interfaces/Project';
import { TokenService } from 'src/app/service/token.service';

@Component({
	selector: 'app-project-element',
	templateUrl: './project-element.component.html',
	styleUrls: ['./project-element.component.css']
})

export class ProjectElementComponent {
	@Input() project: Project = {titulo: "", parrafo: "", lenguajes: [""], linkGit: "", linkPag: "", img: {titulo: "", tipo: "", base64: ""}}
	@Input() i: number = 0;
	@Output() onDeleteProject: EventEmitter<Project> = new EventEmitter();
	@Output() onEditFormProject: EventEmitter<Project> = new EventEmitter();
	imageSource: any;
	isLogged = false;

	constructor( 
		private uiService: UiService,
		private sanitizer: DomSanitizer,
		private tokenService: TokenService
	) {}

	ngOnInit() : void {
		this.imageSource = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${this.project.img.base64}`);
		this.isLogged = this.tokenService.getToken() != null;
	}

	public onDelete(project:Project) {
		this.onDeleteProject.emit(project);
	}

	public onEdit(project:Project) {
		this.onEditFormProject.emit(project);
		this.uiService.toggleFormProject();
	}
}

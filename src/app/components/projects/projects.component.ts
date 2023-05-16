import { Component } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../Interfaces/Project';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/service/ui.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})

export class ProjectsComponent {
	projects : Project[] = [];
	subscription?: Subscription;
	project: Project = {titulo: "", parrafo: "", lenguajes: [{nombre: ""}], linkGit: "", linkPag: "", imagen: {nombre: "", tipo: ""}};
	isLogged = false;

    constructor(
		private projectService: ProjectService,
		private uiService: UiService,
		private tokenService: TokenService
	) {}

	ngOnInit() {
		this.projectService.get().subscribe((projects) => {	
			this.projects = projects
		})
		this.isLogged = this.tokenService.getToken() != null;
	}
	
	public toggleFormProject() {
		this.project = {titulo: "", parrafo: "", lenguajes: [], linkGit: "", linkPag: "", imagen: {nombre: "", tipo: ""}};
		this.uiService.toggleFormProject();
	}

	public deleteProject(project: Project) {
		this.projectService.delete(project.id!).subscribe(() => {
			this.projects = this.projects.filter( ele => ele.id !== project.id )
		})
	}

	public editProject(project: Project) {
		this.projectService.edit(project).subscribe(() => {
			let i: number = this.projects.findIndex(ele => ele.id == project.id);
			this.projects[i] = project;
			this.ngOnInit()
		})
	}

	public addProject(project: Project) {
		this.projectService.save(project).subscribe(() => {
			this.projects.push(project)
			this.ngOnInit()
		});
	}

	public editFormProject(project: Project) {
		this.project = project;
	}
}

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
	project: Project = {titulo: "", parrafo: "", lenguajes: [""], linkGit: "", linkPag: "", img: {titulo: "", tipo: "", base64: ""}};
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
		this.project = {titulo: "", parrafo: "", lenguajes: [], linkGit: "", linkPag: "", img: {titulo: "", tipo: "", base64: ""}};
		this.uiService.toggleFormProject();
	}

	public deleteProject(project: Project) {
		this.projectService.delete(project).subscribe(() => {
			this.projects = this.projects.filter( ele => ele.id !== project.id )
		})
	}

	public editProject(project: Project) {
		this.projectService.edit(project).subscribe(() => {
			let i: number = this.projects.findIndex(ele => ele.id == project.id);
			this.projects[i] = project;
		})
	}

	public addProject(project: Project) {
		this.projectService.add(project).subscribe((project: Project) => {
			this.projects.push(project)
		});
	}

	public editFormProject(project: Project) {
		this.project = project;
	}
}

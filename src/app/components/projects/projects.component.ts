import { Component } from '@angular/core';
import { ProjectService } from '../../service/project.service';
import { Project } from '../../Project';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/service/ui.service';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.css']
})

export class ProjectsComponent {
	projects : Project[] = [];
    showAddProject: boolean = false;
	subscription?: Subscription;
	editar: boolean = false;
	projectEdit: Project = {id: 0, titulo: "", parrafo: "", lenguajes: [""], linkGit: "", linkPag: "", img: {titulo: "", tipo: "", base64: ""}};

    constructor(
		private projectService: ProjectService,
		private uiService: UiService,
	) {}

	ngOnInit() {
		this.projectService.get().subscribe((projects) => {	
			this.projects = projects
		})
		this.subscription = this.uiService.onToggleAddProject().subscribe( value => this.showAddProject = value );
	}
	
	public toggleAddProject() {
		this.projectEdit = {id: 0, titulo: "", parrafo: "", lenguajes: [], linkGit: "", linkPag: "", img: {titulo: "", tipo: "", base64: ""}};
		this.uiService.toggleEdit(false);
		this.uiService.toggleAddProject();
	}

	public deleteProject(project: Project) {
		this.projectService.delete(project).subscribe(() => {
			this.projects = this.projects.filter( ele => ele.id !== project.id )
		})
	}

	public editProject(project: Project) {
		console.log(project)
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

	public editToFormProject(project: Project) {
		this.projectEdit = project;
	}
}

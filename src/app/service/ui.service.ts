import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import disableScroll  from 'disable-scroll';

@Injectable({
	providedIn: 'root'
})
export class UiService {
	private showAddSkill: boolean = false;
	private showAddProject: boolean = false;
	private showAddEducation: boolean = false;
	private showEditAbout: boolean = false;
	private showAddExperience: boolean = false;

	private showAddSkillSubj = new Subject<any>();
	private showAddProjectSubj = new Subject<any>();
	private showAddEducationSubj = new Subject<any>();
	private showEditAboutSubj = new Subject<any>();
	private showAddExperienceSubj = new Subject<any>();

	private showEdit: boolean = false;
	private showEditSubj = new Subject<any>();

	private renderer: Renderer2;
	
	constructor(
		private rendererFactory: RendererFactory2
	) { 
		this.renderer = rendererFactory.createRenderer(null, null)
	}

	private overlay(valor: boolean) {
		if (valor) { 
			disableScroll.off(); 
			this.renderer.removeClass(document.body, "has-overlay");
		} else {
			disableScroll.on();
			this.renderer.addClass(document.body, "has-overlay");
		}
	}

	public toggleAddSkill(): void {
		this.overlay(this.showAddSkill);
		this.showAddSkill = !this.showAddSkill;
		this.showAddSkillSubj.next(this.showAddSkill);
	}

	public toggleAddProject(): void {
		this.overlay(this.showAddProject);
		this.showAddProject = !this.showAddProject;
		this.showAddProjectSubj.next(this.showAddProject);
	}

	public toggleAddEducation(): void {
		this.overlay(this.showAddEducation);
		this.showAddEducation = !this.showAddEducation;
		this.showAddEducationSubj.next(this.showAddEducation);
	}

	public toggleEditAbout(): void {
		this.overlay(this.showEditAbout);
		this.showEditAbout = !this.showEditAbout;
		this.showEditAboutSubj.next(this.showEditAbout);
	}

	public toggleAddExperience(): void {
		this.overlay(this.showAddExperience);
		this.showAddExperience = !this.showAddExperience;
		this.showAddExperienceSubj.next(this.showAddExperience);
	}

	public toggleEdit(valor: boolean): void {
		this.showEdit = valor;
		this.showEditSubj.next(this.showEdit);
	}

	public onToggleAddSkill(): Observable<any> {
		return this.showAddSkillSubj.asObservable();
	} 

	public onToggleAddProject(): Observable<any> {
		return this.showAddProjectSubj.asObservable();
	} 

	public onToggleAddEducation(): Observable<any> {
		return this.showAddEducationSubj.asObservable();
	}

	public onToggleEditAbout(): Observable<any> {
		return this.showEditAboutSubj.asObservable();
	}

	public onToggleAddExperience(): Observable<any> {
		return this.showAddExperienceSubj.asObservable();
	}

	public onToggleEdit(): Observable<any> {
		return this.showEditSubj.asObservable();
	} 
}

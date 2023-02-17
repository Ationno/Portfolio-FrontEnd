import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import disableScroll  from 'disable-scroll';
import { Skill } from '../Skill';

@Injectable({
	providedIn: 'root'
})
export class UiService {
	private showAddSkill: boolean = false;
	private showAddProject: boolean = false;
	private showEdit: boolean = false;
	private showEditSkill: Skill = {id: 0, titulo: "", parrafo: "", porcentaje: 0, eleccion: ""}

	private showAddSkillSubj = new Subject<any>();
	private showAddProjectSubj = new Subject<any>();
	private showEditSubj = new Subject<any>();
	private showEditSkillSubj = new Subject<Skill>();

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

	public toggleEdit(valor: boolean): void {
		this.showEdit = valor;
		this.showEditSubj.next(this.showEdit);
	}

	public toggleEditSkill(skill: Skill): void {
		this.showEditSkill = skill;
		this.showEditSkillSubj.next(this.showEditSkill);
	}

	public onToggleAddSkill(): Observable<any> {
		return this.showAddSkillSubj.asObservable();
	} 

	public onToggleAddProject(): Observable<any> {
		return this.showAddProjectSubj.asObservable();
	} 

	public onToggleEdit(): Observable<any> {
		return this.showEditSubj.asObservable();
	} 

	public onToggleEditSkill(): Observable<any> {
		console.log(this.showEditSkill)
		return this.showEditSkillSubj.asObservable();
	}
}

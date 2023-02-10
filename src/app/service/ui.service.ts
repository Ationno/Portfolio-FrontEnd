import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import disableScroll  from 'disable-scroll';
import { Skill } from '../Skill';

@Injectable({
	providedIn: 'root'
})
export class UiService {
	private showAddSkill: boolean = false;
	private showEdit: boolean = false;
	private showEditSkill: Skill = {id: 0, titulo: "", parrafo: "", porcentaje: 0, eleccion: ""}

	private showAddSubj = new Subject<any>();
	private showEditSubj = new Subject<any>();
	private showEditSkillSubj = new Subject<Skill>();

	private renderer: Renderer2;
	
	constructor(
		private rendererFactory: RendererFactory2
	) { 
		this.renderer = rendererFactory.createRenderer(null, null)
	}

	public toggleAddSkill(): void {
		if (this.showAddSkill) { 
			disableScroll.off(); 
			this.renderer.removeClass(document.body, "has-overlay");
		} else {
			disableScroll.on();
			this.renderer.addClass(document.body, "has-overlay");
		}
		this.showAddSkill = !this.showAddSkill;
		this.showAddSubj.next(this.showAddSkill);
	}

	public toggleEdit(valor: boolean): void {
		this.showEdit = valor;
		this.showEditSubj.next(this.showEdit);
	}

	public toggleEditSkill(skill: Skill): void {
		this.showEditSkill = skill;
		console.log(skill)
		this.showEditSkillSubj.next(this.showEditSkill);
	}

	public onToggleAdd(): Observable<any> {
		return this.showAddSubj.asObservable();
	} 

	public onToggleEdit(): Observable<any> {
		return this.showEditSubj.asObservable();
	} 

	public onToggleEditSkill(): Observable<any> {
		console.log(this.showEditSkill)
		return this.showEditSkillSubj.asObservable();
	}
}

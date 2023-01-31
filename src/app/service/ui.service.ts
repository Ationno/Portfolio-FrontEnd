import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class UiService {
	private showAddSkill: boolean = false;
	private subjet = new Subject<any>();
	
	constructor() { }

	public toggleAddSkill(): void {
		this.showAddSkill = !this.showAddSkill;
		this.subjet.next(this.showAddSkill);
	}

	public onToggle(): Observable<any> {
		return this.subjet.asObservable();
	} 
}

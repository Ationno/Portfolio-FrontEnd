import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Skill } from '../Skill';

@Injectable({
	providedIn: 'root'
})

export class SkillService {
	private apiUrl: string = "http://localhost:5000/skills"

	constructor(
		private http:HttpClient
	) { }

	public getSkills(): Observable<Skill[]> {
		return this.http.get<Skill[]>(this.apiUrl);
	}

	public deleteSkill(skill: Skill): Observable<Skill> {
		const url = `${this.apiUrl}/${skill.id}`
		return this.http.delete<Skill>(url);
	}
}

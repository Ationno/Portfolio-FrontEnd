import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs';
import { Skill } from '../Skill';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type':'application/json'
	})
}

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

	/* Actualizar elementos en la base de datos
	public updateTaskReminder(skill: Skill): Observable<Skill> {
		const url = `${this.apiUrl}/${skill.id}`
		return this.http.put<Skill>(url, skill, httpOptions);
	}
	*/

	public addTask(skill: Skill): Observable<Skill> {
		return this.http.post<Skill>(this.apiUrl, skill, httpOptions);
	} 
}

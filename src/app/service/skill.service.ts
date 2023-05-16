import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Skill } from '../model/skill';

@Injectable({
	providedIn: 'root'
})
export class SkillService {
	url = 'https://backend-0oz6.onrender.com/habilidad/';

	constructor(private httpClient:HttpClient) {}

	public get(): Observable<Skill[]>{
		return this.httpClient.get<Skill[]>(this.url + "list");
	}

	public save(skills: Skill):Observable<any>{
		return this.httpClient.post<any>(this.url + 'save', skills);
	}

	public delete(id: number):Observable<any>{
		return this.httpClient.delete<any>(this.url + `delete/${id}`);
	}

	public edit(skill: Skill):Observable<any>{
		return this.httpClient.put<any>(this.url + 'update', skill);
	}
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Experience } from '../model/experience';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ExperienceService {
	url = 'https://backend-0oz6.onrender.com/experiencia/';

	constructor(private httpClient:HttpClient) {}

	public get(): Observable<Experience[]>{
		return this.httpClient.get<Experience[]>(this.url + "list");
	}

	public save(experience: Experience):Observable<any>{
		return this.httpClient.post<any>(this.url + 'save', experience);
	}

	public delete(id: number):Observable<any>{
		return this.httpClient.delete<any>(this.url + `delete/${id}`);
	}

	public edit(experience: Experience):Observable<any>{
		return this.httpClient.put<any>(this.url + 'update', experience);
	}
}

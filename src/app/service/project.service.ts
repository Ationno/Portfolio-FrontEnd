import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Project } from '../model/project';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ProjectService {
	url = 'https://backend-0oz6.onrender.com/proyecto/';

	constructor(private httpClient:HttpClient) {}

	public get(): Observable<Project[]>{
		return this.httpClient.get<Project[]>(this.url + "list");
	}

	public save(project: Project):Observable<any>{
		return this.httpClient.post<any>(this.url + 'save', project);
	}

	public delete(id: number):Observable<any>{
		return this.httpClient.delete<any>(this.url + `delete/${id}`);
	}

	public edit(project: Project):Observable<any>{
		return this.httpClient.put<any>(this.url + 'update', project);
	}
}

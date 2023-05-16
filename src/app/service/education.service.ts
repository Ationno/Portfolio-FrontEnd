import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Education } from '../model/education';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EducationService {
	url = 'https://backend-0oz6.onrender.com/educacion/';

	constructor(private httpClient:HttpClient) {}

	public get(): Observable<Education[]>{
		return this.httpClient.get<Education[]>(this.url + "list");
	}

	public save(education: Education):Observable<any>{
		return this.httpClient.post<any>(this.url + 'save', education);
	}

	public delete(id: number):Observable<any>{
		console.log(id)
		return this.httpClient.delete<any>(this.url + `delete/${id}`);
	}

	public edit(education: Education):Observable<any>{
		console.log(education)
		return this.httpClient.put<any>(this.url + 'update', education);
	}
}

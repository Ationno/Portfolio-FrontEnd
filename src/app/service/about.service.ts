import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { About } from '../model/about';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AboutService {
	url = 'https://backend-0oz6.onrender.com/sobre/';

	constructor(private httpClient:HttpClient) {}

	public get(): Observable<About[]>{
		return this.httpClient.get<About[]>(this.url + "list");
	}

	public edit(about: About):Observable<any>{
		console.log(about)
		return this.httpClient.put<any>(this.url + 'update', about);
	}
}
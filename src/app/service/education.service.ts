import { Injectable } from '@angular/core';
import { getDB } from './getDB.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
	providedIn: 'root'
})
export class EducationService extends getDB{
	constructor(
		http:HttpClient
	) { 
		super(http)
		this.apiUrl += "education";
	}
}

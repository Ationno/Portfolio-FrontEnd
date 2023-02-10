import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getDB } from './getDB.service';

@Injectable({
	providedIn: 'root'
})
export class SkillService extends getDB {
	constructor(
		http:HttpClient
	) { 
		super(http)
		this.apiUrl += "skills";
	}
}

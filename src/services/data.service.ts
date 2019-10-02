import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap, map } from 'rxjs/operators';
import 'rxjs/add/observable/forkJoin';
import { Observable } from 'rxjs/Observable';
import { JobList } from '../models/joblist-view.model';
import { User } from '../models/user';
export const getTenItems = (array: Array<any>) => array.slice(0, 10);

@Injectable()
export class DataService {
	private ROOT_URL = 'https://jsonplaceholder.typicode.com/';
	constructor(private http: HttpClient) {}

	getData() {
		return Observable.forkJoin([
			this.http.get(`${this.ROOT_URL}/users`),
			this.http.get(`${this.ROOT_URL}/jobdetail`)
		]).pipe(
			map((data: Array<any>) => {
				return data.map(items => {
					return getTenItems(items);
				});
			}),
			map(items => {
				return {
					users: items[0],
					// albums: items[1],
					jobdetail: items[2]
				};
			}),
			map(items => {
				const arr = [];
				const MAX_LENGTH = 10;
				for (var i = 0; i < MAX_LENGTH; i++) {
					arr.push({ jobdetail: items.jobdetail[i], users: items.users[i] });
				}
				return arr;
			})
		);
	}

	removeItem(items: Array<any>, selectedItem: JobList) {
		return items.filter(item => item != selectedItem);
	}

	mergeItems(items: Array<JobList>, newItem: JobList): JobList[] {
		Object.assign({}, (items[items.findIndex(el => el.users.id === newItem.users.id)] = newItem));
		return items;
	}

	removeItemFromAPI(endpoint: string, itemId: string) {
		return this.http.delete(`${this.ROOT_URL}/${endpoint}/${itemId}`);
	}
}

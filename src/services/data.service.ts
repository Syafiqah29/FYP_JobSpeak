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
			map(addingJob => {
				return {
					jobtitle: addingJob[0],
					jobdetail: addingJob[1],
					jobrequirement: addingJob[2],
					jobsalary: addingJob[3],
					jobavailability: addingJob[4],
					jobseekersapplying: addingJob[5],
				};
			}),
			map(addingJob => {
				const arr = [];
				const MAX_LENGTH = 10;
				for (var i = 0; i < MAX_LENGTH; i++) {
					arr.push({ jobtitle: addingJob.jobtitle[i], 
						jobdetail: addingJob.jobdetail[i],
						jobrequirement: addingJob.jobrequirement[i],
						jobsalary: addingJob.jobsalary[i],
						jobavailability: addingJob.jobavailability[i],
						jobseekersapplying: addingJob.jobseekersapplying[i], });
				}
				return arr;
			})
		);
	}

	removeItem(addingJob: Array<any>, selectedItem: JobList) {
		return addingJob.filter(item => item != selectedItem);
	}

	mergeItems(addingJob: Array<JobList>, newItem: JobList): JobList[] {
		Object.assign({}, (addingJob[addingJob.findIndex(el => el.jobtitle.id === newItem.jobtitle.id)] = newItem));
		return addingJob;
	}

	removeItemFromAPI(endpoint: string, itemId: string) {
		return this.http.delete(`${this.ROOT_URL}/${endpoint}/${itemId}`);
	}
}

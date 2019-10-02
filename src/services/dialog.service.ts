import { Injectable } from '@angular/core';
import { AlertController, Events } from 'ionic-angular';
import { JobList } from '../models/joblist-view.model';
@Injectable()
export class DialogService {
	constructor(private alert: AlertController, private events: Events) {}

	openPrompt(selectedItem: JobList) {
		const prompt = this.alert
			.create({
				title: 'Edit detail',
				message: 'Add a new job detail.',
				inputs: [
					{
						name: 'detail',
						placeholder: 'Detail'
					}
				],
				buttons: [
					{
						text: 'Cancel',
						handler: data => {
							console.log('Cancel clicked!');
						}
					},
					{
						text: 'Save',
						handler: data => {
							const newJobdetail = {
								...selectedItem.jobdetail,
								name: data.name
							};

							const newItem = Object.assign(
								{},
								{
									jobtitle: selectedItem.jobtitle, 
									jobdetail: selectedItem.jobdetail,
									jobrequirement: selectedItem.jobrequirement,
									jobsalary: selectedItem.jobsalary,
									jobavailability: selectedItem.jobavailability,
									jobseekersapplying: selectedItem.jobseekersapplying,
								}
							);

							this.events.publish('item:edit', newItem);
						}
					}
				]
			})
			.present();
	}
}

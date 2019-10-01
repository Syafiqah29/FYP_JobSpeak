import { JobDetail } from './jobdetail.model';
import { User } from './user';

export interface JobList {
	jobdetail: any;
	users: User;
	posts: JobDetail;
}

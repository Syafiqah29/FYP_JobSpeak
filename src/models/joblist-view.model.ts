import { JobTitle } from './jobtitle.model'
import { JobDetail } from './jobdetail.model';
import { JobRequirement } from './jobrequirement.model';
import { JobSalary } from './jobsalary.model';
import { JobAvailability } from './jobavailability.model';
import { JobseekersApplying } from './jobseekersapplying.model';

export interface JobList {
	jobtitle: JobTitle;
	jobdetail: JobDetail;
	jobrequirement: JobRequirement;
	jobsalary: JobSalary;
	jobavailability: JobAvailability;
	jobseekersapplying: JobseekersApplying;
}

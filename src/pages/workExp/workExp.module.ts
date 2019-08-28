import { NgModule} from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { WorkExperiencePage } from '../workExp/workExp';

@NgModule({
    declarations: [
        WorkExperiencePage,
    ],
    imports: [
        IonicPageModule.forChild(WorkExperiencePage),
    ],
})
export class WorkExperiencePageModule {}
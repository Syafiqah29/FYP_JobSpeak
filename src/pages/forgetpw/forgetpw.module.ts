import { NgModule} from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { ForgetpwPage } from '../forgetpw/forgetpw';

@NgModule({
    declarations: [
        ForgetpwPage,
    ],
    imports: [
        IonicPageModule.forChild(ForgetpwPage),
    ],
})
export class ForgetpwPageModule {}
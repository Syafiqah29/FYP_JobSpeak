import { NgModule} from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { SignupPage } from '../signup/signup';

@NgModule({
    declarations: [
        SignupPage,
    ],
    imports: [
        IonicPageModule.forChild(SignupPage),
    ],
})
export class SignupPageModule {}
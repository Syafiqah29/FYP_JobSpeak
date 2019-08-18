import { NgModule} from '@angular/core';
import { IonicPageModule} from 'ionic-angular';
import { SplashscreenPage} from '../splashscreen/splashscreen';

@NgModule({
    declarations: [
        SplashscreenPage,
    ],
    imports: [
        IonicPageModule.forChild(SplashscreenPage),
    ],
})
export class SplashScreenPageModule {}

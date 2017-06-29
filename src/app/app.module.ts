import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BirthdaysReducer } from '../reducers/birthdays.reducer';
import { BirthdayActions } from '../actions/birthday.actions';
import { BirthdayEffects } from '../effects/birthday.effects';
import { BirthdayService } from '../services/birthday.service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore({ birthdays: BirthdaysReducer }),
    // Update imports section run the BirthdayEffects when the application starts.
    EffectsModule.run(BirthdayEffects)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BirthdayActions,
    BirthdayService
  ]
})
export class AppModule {}

import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/rx';

import { AppState } from '../../services/app-state';
import { Birthday } from '../../models/birthday';
import { DetailsPage } from '../details/details';

/*
    We are injecting the store here and all we need to do is select the birthdays state. We can now set the change
    detection strategy to OnPush.
*/

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {

    public birthdays: Observable<Birthday[]>;

    constructor(public navCtrl: NavController, public store: Store<AppState>,
                public modalCtrl: ModalController) {
        this.birthdays = this.store.select(state => state.birthdays);
    }

    showDetail(birthday) {
        let modal = this.modalCtrl.create(DetailsPage, { birthday: birthday });
        modal.present();
    }

}

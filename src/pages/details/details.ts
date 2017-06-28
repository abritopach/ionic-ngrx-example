import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Store } from '@ngrx/store';

import { AppState } from '../../services/app-state';
import { BirthdayActions } from '../../actions/birthday.actions';

/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

/*
 As you can see, all we do here is let the store know when an action happened. The store will then call the reducer
 which will, in turn, return the new state to the store.
*/

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  public birthday: any = {};
  public isNew = true;
  public action = 'Add';
  public isoDate = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController,
              public store: Store<AppState>, public birthdayActions: BirthdayActions) {
  }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DetailsPage');

        let editBirthday = this.navParams.get('birthday');

        if (editBirthday) {
            this.birthday = editBirthday;
            this.isNew = false;
            this.action = 'Edit';
            this.isoDate = this.birthday.Date.toISOString().slice(0, 10);
        }
    }

    save() {
        this.birthday.Date = new Date(this.isoDate);

        if (this.isNew) {
            this.store.dispatch(this.birthdayActions.addBirthday(this.birthday));
        }
        else {
            this.store.dispatch(this.birthdayActions.updateBirthday(this.birthday));
        }

        this.dismiss();
    }

    delete() {
        this.store.dispatch(this.birthdayActions.deleteBirthday(this.birthday));
        this.dismiss();
    }

    dismiss() {
        this.viewCtrl.dismiss(this.birthday);
    }

}

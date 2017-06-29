import { Injectable } from '@angular/core';
import { Effect, toPayload, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import {Action} from '@ngrx/store';

import { BirthdayService } from '../services/birthday.service';
import { Birthday } from '../models/birthday';
import { BirthdayActions } from '../actions/birthday.actions';

/*
    Implement the add/update/delete side-effects for our actions.

    For every side-effect, we create a new observable that responds to a specific action (using ofType) and calls the
    corresponding function on the database service.

    The @Effect decorator should be placed on every observable side-effect so @ngrx/effects can connect them to
    the store.

*/

@Injectable()
export class BirthdayEffects {

    constructor(
        // The actions$ observable will let us know when a new action was dispatched to the store.
        private actions$: Actions,
        private db: BirthdayService,
        private birthdayActions: BirthdayActions
    ) { }

    @Effect() addBirthday$ = this.actions$
        .ofType(BirthdayActions.ADD_BIRTHDAY)
        .map<Action, Birthday>(toPayload)
        .mergeMap(birthday => this.db.add(birthday));

    @Effect() updateBirthday$ = this.actions$
        .ofType(BirthdayActions.UPDATE_BIRTHDAY)
        .map<Action, Birthday>(toPayload)
        .mergeMap(birthday => this.db.update(birthday));

    @Effect() deleteBirthday$ = this.actions$
        .ofType(BirthdayActions.DELETE_BIRTHDAY)
        .map<Action, Birthday>(toPayload)
        .mergeMap(birthday => this.db.delete(birthday));

    allBirthdays$ = this.db.getAll()
        .map(birthdays => {
            console.log("allBirthdays$ called");
            return this.birthdayActions.loadBirthdaysSuccess(birthdays)
        });

    changedBirthdays$ = this.db.getChanges()
        .map(change => {
            console.log("changedBirthdays$ called");
            if (change._deleted) {
                return this.birthdayActions.deleteBirthdaySuccess(change._id);
            }
            else {
                return this.birthdayActions.addUpdateBirthdaySuccess(change);
            }
        });

    @Effect() getBirthdays$ = Observable.concat(this.allBirthdays$, this.changedBirthdays$);
}

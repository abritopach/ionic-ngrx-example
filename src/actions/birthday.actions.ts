import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';

import {Birthday} from '../models/birthday';

@Injectable()
export class BirthdayActions {

    /* An action is anything that can happen that has an effect on the application state. We can have the following
       actions:

      -  Add a birthday.
      - Update a birthday.
      - Delete a birthday.

     These actions will be dispatched to the store which will then call the reducer to update the birthdays array with
     the action.

     An action has a type, which is just a string that identifies the action and a payload, which, in this case, will
     be a Birthday object.

    */

    static ADD_BIRTHDAY = 'ADD_BIRTHDAY';
    addBirthday(birthday: Birthday): Action {
        return {
            type: BirthdayActions.ADD_BIRTHDAY,
            payload: birthday
        }
    }

    static UPDATE_BIRTHDAY = 'UPDATE_BIRTHDAY';
    updateBirthday(birthday: Birthday): Action {
        return {
            type: BirthdayActions.UPDATE_BIRTHDAY,
            payload: birthday
        }
    }

    static DELETE_BIRTHDAY = 'DELETE_BIRTHDAY';
    deleteBirthday(birthday: Birthday): Action {
        return {
            type: BirthdayActions.DELETE_BIRTHDAY,
            payload: birthday
        }
    }
}

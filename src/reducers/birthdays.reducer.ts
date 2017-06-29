import {ActionReducer, Action} from '@ngrx/store';
import {BirthdayActions} from '../actions/birthday.actions';

import { Birthday } from '../models/birthday';

//let nextId = 0;

/*

    A reducer function takes the current state of the data it's responsible for, makes a modification depending on
    the action and returns the new state.

    So in our case, this specific reducer is responsible for keeping the birthdays state up-to-date.

    In the code below you can see that initially, the state will be an empty array. Depending on the action, we then
    create a new array that will contain the updated state. The store will keep track of this state, which is the
    birthdays array as defined in AppState, and pass it into the reducer when an action is received.
   
*/


/*
export function BirthdaysReducer(state = [], action: Action) {
    switch(action.type) {
        case BirthdayActions.ADD_BIRTHDAY:
            return [...state, Object.assign({}, action.payload, { id: nextId++ })];
        case BirthdayActions.UPDATE_BIRTHDAY:
            return state.map(birthday => {
                return birthday.id === action.payload.id ? Object.assign({}, birthday, action.payload) : birthday;
            });
        case BirthdayActions.DELETE_BIRTHDAY:
            return state.filter(birthday => birthday.id !== action.payload.id);
        default:
            return state;
    };
}
*/

export const BirthdaysReducer: ActionReducer<Birthday[]> = (state: Birthday[] = [], action: Action) => {
    console.log(action.type);
    switch(action.type) {
        case BirthdayActions.LOAD_BIRTHDAYS_SUCCESS:
            return action.payload;
        case BirthdayActions.ADD_UPDATE_BIRTHDAY_SUCCESS:
            var exists = state.find(birthday => birthday._id === action.payload._id);
            console.log(exists);
            if (exists) {
                // UPDATE
                return state.map(birthday => {
                    return birthday._id === action.payload._id ? Object.assign({}, birthday, action.payload) : birthday;
                });
            }
            else {
                // ADD
                return [...state, Object.assign({}, action.payload)];
            }
        case BirthdayActions.DELETE_BIRTHDAY_SUCCESS:
            return state.filter(birthday => birthday._id !== action.payload);
        default:
            return state;
    };
}

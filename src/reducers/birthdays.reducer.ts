import {Action} from '@ngrx/store';
import {BirthdayActions} from '../actions/birthday.actions';

let nextId = 0;

/*

    A reducer function takes the current state of the data it's responsible for, makes a modification depending on
    the action and returns the new state.

    So in our case, this specific reducer is responsible for keeping the birthdays state up-to-date.

    In the code below you can see that initially, the state will be an empty array. Depending on the action, we then
    create a new array that will contain the updated state. The store will keep track of this state, which is the
    birthdays array as defined in AppState, and pass it into the reducer when an action is received.
   
*/


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

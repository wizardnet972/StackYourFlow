/* tslint:disable: no-switch-case-fall-through */
import { Action } from '@ngrx/store';

import { Question } from './questions.model';
import * as Questions from './questions.actions';

export interface State {
  loading: boolean;
  questions: Question[];
};

const initialState: State = {
  loading: false,
  questions: []
};

export function reducer(state = initialState, action: Questions.Actions): State {

  switch (action.type) {

    case Questions.ActionTypes.SEARCH: {
      const query = action.payload;

      if (query === '') {
        return {
          questions: [],
          loading: false,
        };
      }

      return Object.assign({}, state, {
        //query,
        loading: true
      });
    }

    case Questions.ActionTypes.SEARCH_COMPLETE: {
      const questions = action.payload;

      return {
        questions: questions.items,
        loading: false,
        //query: state.query
      };
    }

    default: {
      return state;
    }

  }
}

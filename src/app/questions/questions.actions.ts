import { Action } from '@ngrx/store';
import { type } from '../util';

export const ActionTypes = {
  SEARCH:           type('[Questions] Search'),
  SEARCH_COMPLETE:  type('[Questions] Search Complete'),
};

export class SearchAction implements Action {
  type = ActionTypes.SEARCH;

  constructor(public payload: any) { }
}

export class SearchCompleteAction implements Action {
  type = ActionTypes.SEARCH_COMPLETE;

  constructor(public payload: any) { }
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions
  = SearchAction
  | SearchCompleteAction

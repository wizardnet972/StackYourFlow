import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { QuestionsService } from './questions.service';
import * as Questions from './questions.actions';

@Injectable()
export class QuestionsEffects {
  constructor(
    private actions$: Actions,
    private questions: QuestionsService
  ) { }


  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(Questions.ActionTypes.SEARCH)
    .debounceTime(300)
    .map((action: Questions.SearchAction) => action.payload)
    .switchMap(query => {
      // if (query === '') {
      //   return empty();
      // }

      const nextSearch$ = this.actions$.ofType(Questions.ActionTypes.SEARCH).skip(1);

      return this.questions.search(query)
        .takeUntil(nextSearch$)
        .map(questions => new Questions.SearchCompleteAction(questions))
        .catch(() => of(new Questions.SearchCompleteAction([])));
    });
}
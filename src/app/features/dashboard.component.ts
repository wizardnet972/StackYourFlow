import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../reducers';
import { Store } from '@ngrx/store';
import { UserActions } from '../user/user.actions';
import { User } from '../user/user.model';

import * as Questions from '../questions/questions.actions';

@Component({
  selector: 'my-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [`#my-logout-button { background: #F44336 }`]
})

export class DashboardComponent implements OnDestroy, OnInit {
  destroyed$: Subject<any> = new Subject<any>();
  form: FormGroup;
  nameLabel = 'Enter your name';
  orderLabel = 'desc';
  sortLabel = 'activity';
  taggedLabel = 'ngrx';
  siteLabel = 'stackoverflow';
  user: User;
  user$: Observable<User>;
  questions$: Observable<any>;

  constructor(
    fb: FormBuilder,
    private store: Store<AppState>,
    private userActions: UserActions,
  ) {
    this.form = fb.group({
      name: '',
      order: 'desc',
      sort: 'activity',
      tagged: 'ngrx',
      site: 'stackoverflow',


    });
    this.user$ = this.store.select(state => state.user.user);
    this.user$.takeUntil(this.destroyed$)
      .subscribe(user => { this.user = user; });

    this.questions$ = this.store.select(state => state.questions.questions);
  }

  ngOnInit() {
    this.form.get('name').setValue(this.user.name);
  }

  clearName() {
    this.store.dispatch(this.userActions.editUser(
      Object.assign({}, this.user, { name: '' }
      )));

    this.form.get('name').setValue('');
  }

  logout() {
    this.store.dispatch(this.userActions.logout());
  }

  submitState() {

     this.store.dispatch(new Questions.SearchAction(this.form.value));
  }

  ngOnDestroy() {
    this.destroyed$.next();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, takeWhile } from 'rxjs/operators';
import { IUser } from '../core/interfaces/user.interface';
import { getUsers } from '../store/app.actions';
import { AppState } from '../store/app.reducer';
import { selectCurrentUser, selectSimilarUsers, selectUsers } from '../store/app.selectors';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit, OnDestroy {
  user$: Observable<IUser> = null;
  similarUsers$: Observable<IUser[]> = null;
  isComponentAlive: boolean;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.isComponentAlive = true;
    this.route.paramMap.pipe(
      takeWhile(() => !!this.isComponentAlive)
    ).subscribe(params => {
      const uuid = params.get('uuid');
      this.user$ = this.store.select(selectCurrentUser(uuid))
      this.similarUsers$ = this.store.select(selectSimilarUsers(uuid))
    });
    this.getUsersIfNecessary();
  }

  getUsersIfNecessary() {
    this.store.select(selectUsers)
      .pipe(first())
      .subscribe(users => {
        if (users === null) {
          this.store.dispatch(getUsers())
        }
      })
  }

  ngOnDestroy() {
    this.isComponentAlive = false;
  }
}

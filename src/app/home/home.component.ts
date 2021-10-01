import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IUser } from '../core/interfaces/user.interface';
import { getUsers } from '../store/app.actions';
import { AppState } from '../store/app.reducer';
import { selectUsers } from '../store/app.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  users$: Observable<IUser[]>;
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.users$ = this.store.select(selectUsers);
    this.store.dispatch(getUsers())
  }


  ngOnDestroy() { }
}

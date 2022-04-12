import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Holiday } from '@eternal/holidays/model';
import { Configuration } from '@eternal/shared/config';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import * as actions from './holidays.actions';

@Injectable()
export class HolidaysEffects {
  find$ = createEffect(() =>
    this.actions$.pipe(
      ofType(actions.find),
      switchMap(() => this.httpClient.get<Holiday[]>('/holiday')),
      map((holidays) =>
        holidays.map((holiday) => ({
          ...holiday,
          imageUrl: `${this.config.baseUrl}${holiday.imageUrl}`,
        }))
      ),
      map((holidays) => actions.found({ holidays }))
    )
  );

  constructor(
    private actions$: Actions,
    private httpClient: HttpClient,
    private config: Configuration
  ) {}
}
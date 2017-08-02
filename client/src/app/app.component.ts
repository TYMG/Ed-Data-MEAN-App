import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';

import { AppService } from './app.service';

import { State } from './app.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public states: State[];
  public getStatesSubscription: Subscription;
  public postStateSubscription: Subscription;
  public deleteStateSubscription: Subscription;

  public stateFormGroup: FormGroup;

  public constructor(
    private appService: AppService,
    private formBuilder: FormBuilder
  ) {
    this.states = [];
    this.getStatesSubscription = new Subscription();
    this.postStateSubscription = new Subscription();
    this.deleteStateSubscription = new Subscription();
    this.stateFormGroup = new FormGroup({});

    this.getStates();
  }

  public ngOnInit(): void {
    this.stateFormGroup = this.formBuilder.group({
      postalCode: [null]
    });
  }

  public ngOnDestroy(): void {
    this.getStatesSubscription.unsubscribe();
    this.postStateSubscription.unsubscribe();
    this.deleteStateSubscription.unsubscribe();
  }

  public getStates(): void {
    this.getStatesSubscription = this.appService.getStates()
      .subscribe((statesResponse: State[]) => {
        this.states = statesResponse;
      });
  }

  public onSubmitState(): void {
    const state: State = this.stateFormGroup.value;
    this.postStateSubscription = this.appService.postState(state)
      .subscribe((response: Response) => {
        if (response.ok) {
          this.stateFormGroup.reset();
          this.states.push(<State> response.json()['ops'][0]);
        }
      });
  }

  public onDeleteState(state: State): void {
    this.deleteStateSubscription = this.appService.deleteState(state)
      .subscribe((deleteResponse: Response) => {
        if (deleteResponse.ok) {
          const stateIndex: number = this.states.indexOf(state);
          this.states.splice(stateIndex, 1);
        }
      });
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { SettingsService } from 'src/app/services/settings/settings.service';
import { ObservableExampleService } from 'src/app/services/testing/observable-example.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {

  private subjectForUnsubscribe = new Subject();

  constructor(private testing: ObservableExampleService,
              private settingsService:SettingsService) { }

  ngOnInit(): void {

    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data)=>{
      console.log('settings data', data)
    });

     this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe(
      (data)=> {
        console.log('settings data from subject', data)
      })
  }


  ngOnDestroy(): void {
    this.subjectForUnsubscribe.next(true);
    this.subjectForUnsubscribe.complete();
  }
}

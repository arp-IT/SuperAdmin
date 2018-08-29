import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {

  private messageSource = new BehaviorSubject('default task ID');
  private messageSource1 = new BehaviorSubject('default user ID')
  currentMessage = this.messageSource.asObservable();
  currentMessage1 = this.messageSource1.asObservable();

  constructor() { }

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  changeMessage1(message: string) {
    this.messageSource1.next(message);
  }

}
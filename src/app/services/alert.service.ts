import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private DEFAULT_ALERT_OBJECT = {
    showAlert: false,
    text: '',
    color: '#f9f9f9',
  };

  private alertSubject = new BehaviorSubject<any>(this.DEFAULT_ALERT_OBJECT);
  public alertObject$ = this.alertSubject.asObservable();

  showAlert({ text = '', color = '#f9f9f9' }) {
    this.alertSubject.next({
      showAlert: true,
      text,
      color,
    });
    setTimeout(() => {
      this.alertSubject.next(this.DEFAULT_ALERT_OBJECT);
    }, 3000);
  }

  dismissAlert() {
    this.alertSubject.next(this.DEFAULT_ALERT_OBJECT);
  }
}

import { Component, ViewChild, ElementRef } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { LoadingService } from './services/loading.service';
import { PlayerService } from './services/player.service';
import { AlertService } from './services/alert.service';
import { CommonModule } from '@angular/common';
import { Constant } from '../constant';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  title: string = 'dres_studio_fe';
  isLoggedIn = false;
  isLoading = this.loadingService.loading$;
  playingObject: any = {};
  alertObject: any = {};

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService,
    private playerService: PlayerService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.alertService.alertObject$.subscribe((obj) => {
      this.alertObject = obj;
    });
    this.playerService.playingObject$.subscribe((obj) => {
      console.log('Playing object');
      this.playingObject = obj;
      if (this.audioPlayer) {
        this.audioPlayer.nativeElement.pause();
        this.audioPlayer.nativeElement.currentTime = 0;
      }
    });
  }

  logout() {
    this.playerService.stopPlayer();
    this.authService.logout();
    this.isLoggedIn = this.authService.isLoggedIn();
    this.alertService.showAlert({
      text: 'Logged out successfully',
      color: Constant.ALERT_COLORS.SUCCESS,
    });
  }

  dismissAlert() {
    this.alertService.dismissAlert();
  }
}

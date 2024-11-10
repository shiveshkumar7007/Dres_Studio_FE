import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { PlayerService } from '../../services/player.service';
import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Constant } from '../../../constant';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  showChallengeModal = false;
  user: any = {
    name: '',
    bio: '',
    profilePhotoUrl: '',
    coverPhotoUrl: '',
  };
  title: string = '';
  startTime: string = '';
  endTime: string = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private playerService: PlayerService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const userId = params.get('id');
      if (userId) {
        this.loadUserProfile(userId);
      }
    });
  }

  loadUserProfile(userId: string): void {
    this.loadingService.startLoading();
    this.dataService.getUserProfile(userId).subscribe({
      next: (response) => {
        this.user = response?.data?.profileData || {};
        this.loadingService.stopLoading();
      },
      error: (error) => {
        console.error('Load profile error', error);
        this.loadingService.stopLoading();
      },
    });
  }

  openChallengeModal() {
    this.showChallengeModal = true;
  }

  closeChallengeModal() {
    this.showChallengeModal = false;
  }

  challengeUser() {
    const challengeData = {
      title: this.title,
      startTime: this.startTime,
      endTime: this.endTime,
      userId: this.user._id,
    };
    this.loadingService.startLoading();
    this.dataService.createNewChallenge(challengeData).subscribe({
      next: (response) => {
        this.showChallengeModal = false;
        this.alertService.showAlert({
          text: response?.message,
          color: Constant.ALERT_COLORS.SUCCESS,
        });
        this.loadingService.stopLoading();
      },
      error: (error) => {
        console.error('Challenge error', error);
        this.alertService.showAlert({
          text: error?.error?.message,
          color: Constant.ALERT_COLORS.ERROR,
        });
        this.loadingService.stopLoading();
      },
    });
  }
}

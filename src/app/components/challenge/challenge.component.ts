import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { LoadingService } from '../../services/loading.service';
import { AlertService } from '../../services/alert.service';
import { Constant } from '../../../constant';

@Component({
  selector: 'app-challenge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './challenge.component.html',
  styleUrl: './challenge.component.css',
})
export class ChallengeComponent {
  challenges: any[] = [];
  filteredContentList: any[] = [];
  contentList: any[] = [];

  constructor(
    private dataService: DataService,
    private loadingService: LoadingService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadUserChallenges();
    this.loadUserContent();
  }

  loadUserChallenges() {
    this.loadingService.startLoading();
    this.dataService.getUserChallenges().subscribe({
      next: (response) => {
        this.challenges = response?.data?.challenges || [];
        this.loadingService.stopLoading();
      },
      error: (error) => {
        console.error('Challenge load error', error);
        this.loadingService.stopLoading();
      },
    });
  }

  loadUserContent() {
    this.dataService.getContentList().subscribe({
      next: (response) => {
        this.contentList = response?.data?.contents || [];
        this.filteredContentList = this.contentList;
      },
      error: (error) => {
        console.error('Content load error', error);
      },
    });
  }

  filterContent(event: any) {
    const searchValue = event.target.value.toLowerCase();
    this.filteredContentList = this.contentList.filter((item) =>
      item.title.toLowerCase().includes(searchValue)
    );
  }

  updateChallenge(params: any) {
    const { challengeId, status, contentId } = params;
    this.loadingService.startLoading();
    const challengeData: any = {};
    if (status) {
      challengeData.status = status;
    }
    if (contentId) {
      challengeData.contentId = contentId;
    }
    this.dataService.updateChallenge(challengeId, challengeData).subscribe({
      next: (response) => {
        this.loadUserChallenges();
        this.loadingService.stopLoading();
        this.alertService.showAlert({
          text: response?.message,
          color: Constant.ALERT_COLORS.SUCCESS,
        });
      },
      error: (error) => {
        console.error('Update challenge error', error);
        this.loadingService.stopLoading();
      },
    });
  }

}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { LoadingService } from '../../services/loading.service';

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
    private loadingService: LoadingService
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
}

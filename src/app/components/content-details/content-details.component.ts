import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { PlayerService } from '../../services/player.service';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-content-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './content-details.component.html',
  styleUrls: ['./content-details.component.css'],
})
export class ContentDetailsComponent implements OnInit {
  contentData: any = null;
  userData: any = null;
  contentRating: number = 0;
  currentRating: number = 0;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dataService: DataService,
    private playerService: PlayerService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const contentId = params.get('id');
      if (contentId) {
        this.loadContent(contentId);
      }
    });
  }

  loadContent(contentId: string): void {
    this.loadingService.startLoading();
    this.dataService.getContentById(contentId).subscribe({
      next: (response) => {
        this.contentData = response?.data?.contentData || {};
        this.userData = response?.data?.userData || {};
        this.contentRating = response?.data?.avgRating;
        this.currentRating = response?.data?.userRating;
        this.loadingService.stopLoading();
      },
      error: (error) => {
        console.error('Load content error', error);
        this.loadingService.stopLoading();
      },
    });
  }

  playAudio({ audioUrl = '', thumbnailUrl = '' }): void {
    this.playerService.initializePlayer({ audioUrl, thumbnailUrl });
  }

  playContent(content: any): void {
    if (content.type === 'audio') {
      this.playAudio({
        audioUrl: content.fileUrl,
        thumbnailUrl: content.thumbnailUrl,
      });
    }
  }

  rateContent(rating: number): void {
    this.loadingService.startLoading();
    this.dataService
      .updateContentRating(this.contentData._id, rating)
      .subscribe({
        next: (response) => {
          this.currentRating = rating;
          this.loadingService.stopLoading();
        },
        error: (error) => {
          console.error('Rate content error', error);
          this.loadingService.stopLoading();
        },
      });
  }

  onUserClick(): void {
    const { userId } = this.contentData;
    if (userId === this.authService.getUserId()) {
      this.router.navigate([`/profile`]);
    } else {
      this.router.navigate([`/user/${userId}`]);
    }
  }
}

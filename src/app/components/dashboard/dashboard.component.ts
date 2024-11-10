import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { LoadingService } from '../../services/loading.service';
import { PlayerService } from '../../services/player.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  topArtists: any[] = [];
  latestReleases: any[] = [];

  constructor(
    private dataService: DataService,
    private loadingService: LoadingService,
    private playerService: PlayerService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadingService.startLoading();
    this.loadTopArtists();
    this.loadLatestReleases();
    this.loadingService.stopLoading();
  }

  loadTopArtists(): void {
    this.dataService.getTopArtists().subscribe({
      next: (response) => {
        this.topArtists = response?.data?.topArtists || [];
      },
      error: (error) => {
        console.error('Top artists load error', error);
      },
    });
  }

  loadLatestReleases(): void {
    this.dataService.getLatestReleases().subscribe({
      next: (response) => {
        this.latestReleases = response?.data?.latestReleases || [];
      },
      error: (error) => {
        console.error('Latest releases load error', error);
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

  onContentClick(content: any): void {
    const { _id } = content;
    this.router.navigate([`/content/${_id}`]);
  }

  onUserClick(user: any): void {
    const { userId } = user;
    if (userId === this.authService.getUserId()) {
      this.router.navigate([`/profile`]);
    } else {
      this.router.navigate([`/user/${userId}`]);
    }
  }
}

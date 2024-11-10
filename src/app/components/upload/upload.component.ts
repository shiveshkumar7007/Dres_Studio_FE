import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { UploadService } from '../../services/upload-file.service';
import { DataService } from '../../services/data.service';
import { LoadingService } from '../../services/loading.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent implements OnInit {
  @ViewChild('uploadContainer') uploadContainer!: ElementRef;

  uploadData = {
    title: '',
    description: '',
    audioFile: null as File | null,
    lyrics: '',
    thumbnail: null as File | null,
  };
  recentUploads: any[] = [];
  uploadType: string = 'audio';
  isUploadVisible = false;
  ctaText = '🎙';

  constructor(
    private uploadService: UploadService,
    private dataService: DataService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadRecentUploads();
  }

  toggleUploadSection() {
    this.isUploadVisible = !this.isUploadVisible;
    if (this.isUploadVisible) {
      this.ctaText = '❌';
    } else {
      this.ctaText = '🎙';
    }
    this.uploadContainer.nativeElement.scrollTop = 0;
  }

  onAudioChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.uploadData.audioFile = input.files[0];
    }
  }

  onThumbnailChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.uploadData.thumbnail = input.files[0];
    }
  }

  onUploadTypeChange() {
    if (this.uploadType === 'audio') {
      this.uploadData.lyrics = '';
    } else {
      this.uploadData.audioFile = null;
    }
  }

  async onSubmit() {
    let contentData = {};
    if (
      this.uploadType === 'audio' &&
      this.uploadData.audioFile &&
      this.uploadData.thumbnail
    ) {
      const audioUrl = await this.uploadService.upload(
        this.uploadData.audioFile,
        'audios/' + this.uploadData.audioFile.name
      );
      const thumbnailUrl = await this.uploadService.upload(
        this.uploadData.thumbnail,
        'thumbnails/' + this.uploadData.thumbnail.name
      );
      contentData = {
        title: this.uploadData.title,
        description: this.uploadData.description,
        fileUrl: audioUrl,
        thumbnailUrl,
        type: 'audio',
      };
    }

    if (
      this.uploadType === 'lyrics' &&
      this.uploadData.lyrics &&
      this.uploadData.thumbnail
    ) {
      const thumbnailUrl = await this.uploadService.upload(
        this.uploadData.thumbnail,
        'thumbnails/' + this.uploadData.thumbnail.name
      );
      contentData = {
        title: this.uploadData.title,
        description: this.uploadData.description,
        text: this.uploadData.lyrics,
        thumbnailUrl,
        type: 'lyrics',
      };
    }

    this.dataService.createNewContent(contentData).subscribe((response) => {
      console.log('Upload successful', response);
      this.loadRecentUploads();
      this.uploadData = {
        title: '',
        description: '',
        audioFile: null as File | null,
        lyrics: '',
        thumbnail: null as File | null,
      };
    });
  }

  loadRecentUploads() {
    this.loadingService.startLoading();
    this.dataService.getContentList().subscribe({
      next: (response) => {
        const contents = response?.data?.contents || [];
        this.recentUploads = contents;
        this.loadingService.stopLoading();
      },
      error: (error) => {
        console.error('Content load error', error);
        this.loadingService.stopLoading();
      },
    });
  }

  resetForm() {
    this.uploadData = {
      title: '',
      description: '',
      audioFile: null as File | null,
      lyrics: '',
      thumbnail: null as File | null,
    };
  }
}

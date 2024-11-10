import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';
import { UploadService } from '../../services/upload-file.service';
import { LoadingService } from '../../services/loading.service';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, AngularFireStorageModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [AuthService, DataService, UploadService],
})
export class ProfileComponent implements OnInit {
  user: any = {
    name: '',
    bio: '',
    profilePhotoUrl: '',
    coverPhotoUrl: '',
  };
  isEditing: boolean = false;

  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private uploadService: UploadService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserProfile();
  }

  loadUserProfile() {
    this.loadingService.startLoading();
    this.dataService.getProfile().subscribe({
      next: (response) => {
        const profileData = response?.data?.profileData || {};
        this.user = { ...profileData };
        this.loadingService.stopLoading();
      },
      error: (error) => {
        console.error('Profile load error', error);
        this.loadingService.stopLoading();
      },
    });
  }

  cancelEdit() {
    this.isEditing = false;
  }

  editProfile() {
    this.isEditing = true;
  }

  saveProfile() {
    this.loadingService.startLoading();
    this.dataService.updateProfile(this.user).subscribe({
      next: (response) => {
        this.isEditing = false;
        this.loadUserProfile();
        this.loadingService.stopLoading();
      },
      error: (error) => {
        console.error('Profile update error', error);
        this.loadingService.stopLoading();
      },
    });
  }

  // Upload profile photo
  onProfilePhotoChange(event: any) {
    this.loadingService.startLoading();
    const file = event.target.files[0];
    const path = `profilePhotos/${Date.now()}_${file.name}`;
    this.uploadService
      .upload(file, path)
      .then((url) => {
        this.user.profilePhotoUrl = url;
        this.loadingService.stopLoading();
      })
      .catch((error) => {
        console.error('Profile photo upload error:', error);
        this.loadingService.stopLoading();
      });
  }

  // Upload cover photo
  onCoverPhotoChange(event: any) {
    this.loadingService.startLoading();
    const file = event.target.files[0];
    const path = `coverPhotos/${Date.now()}_${file.name}`;
    this.uploadService
      .upload(file, path)
      .then((url) => {
        this.user.coverPhotoUrl = url;
        this.loadingService.stopLoading();
      })
      .catch((error) => {
        console.error('Cover photo upload error:', error);
        this.loadingService.stopLoading();
      });
  }
}

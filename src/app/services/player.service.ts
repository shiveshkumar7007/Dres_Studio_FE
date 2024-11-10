import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private DEFAULT_PLAYING_OBJECT = {
    isPlaying: false,
    audioUrl: '',
    thumbnailUrl: '',
  };

  private playerSubject = new BehaviorSubject<{
    isPlaying: boolean;
    audioUrl: string;
    thumbnailUrl: string;
  }>(this.DEFAULT_PLAYING_OBJECT);
  public playingObject$ = this.playerSubject.asObservable();

  initializePlayer({ audioUrl = '', thumbnailUrl = '' }) {
    this.playerSubject.next({
      isPlaying: true,
      audioUrl,
      thumbnailUrl,
    });
  }

  stopPlayer() {
    this.playerSubject.next(this.DEFAULT_PLAYING_OBJECT);
  }
}

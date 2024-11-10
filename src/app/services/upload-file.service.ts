import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private storage: AngularFireStorage) {}

  upload(file: File, path: string): Promise<string> {
    const fileRef = this.storage.ref(path);
    const task = fileRef.put(file);

    task.percentageChanges().subscribe((progress) => {
      console.log('Upload progress:', progress);
    });

    return new Promise<string>((resolve, reject) => {
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(
              (url) => {
                resolve(url);
              },
              (error) => {
                reject(error);
              }
            );
          })
        )
        .subscribe();
    });
  }
}

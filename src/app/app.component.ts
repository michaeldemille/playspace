// app.component.ts

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lightbox } from 'ngx-lightbox'; /* added the import for the Lightbox component */
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public searchTerm: string = '';
  public images: any[] = [];
  public page: number = 2;
  public heroImageUrl: string = ''; /* added the heroImageUrl property */
  public unsplashApiKey = environment.unsplash;

  constructor(private http: HttpClient, private _lightbox: Lightbox) {
    const unsplashApiUrl = `https://api.unsplash.com/photos/random?client_id=${this.unsplashApiKey}`;

    this.http.get(unsplashApiUrl).subscribe((data: any) => {
      this.heroImageUrl =
        data['urls'][
          'full'
        ]; /* set the heroImageUrl property to the URL of the random image */
    });
  }

  onSubmit(searchTerm: string) {
    const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=${searchTerm}&client_id=${this.unsplashApiKey}`;

    this.http.get(unsplashApiUrl).subscribe((data: any) => {
      this.images = data['results'];
      this.page = 2;
    });
  }

  getMore(searchTerm: string) {
    const unsplashApiUrl = `https://api.unsplash.com/search/photos?query=${searchTerm}&page=${this.page}&client_id=${this.unsplashApiKey}`;

    this.http.get(unsplashApiUrl).subscribe((data: any) => {
      this.images.push(...data['results']);
      this.page++;
    });
  }

  open(index: number): void {
    const image = [
      {
        src: this.images[index].urls.regular,
        thumb: this.images[index].urls.small,
      },
    ];
    // open lightbox
    this._lightbox.open(image, 0);
  }

  close(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }
}

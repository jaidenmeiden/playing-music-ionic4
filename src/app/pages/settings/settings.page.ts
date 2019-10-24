import { Component } from '@angular/core';
import {CameraResultType, CameraSource, Plugins} from "@capacitor/core";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  userImage = "./assets/img/user.jpg";
  photo: SafeResourceUrl;
  constructor(
      private sanitizer: DomSanitizer
  ) {}

  async takePhoto() {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    // Se debe sanar nuestra URL
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(
        image && image.dataUrl
    );
  }
}

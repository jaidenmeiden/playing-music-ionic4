import { Component } from '@angular/core';
import {ModalController, NavParams} from "@ionic/angular";

@Component({
  selector: 'app-songs-modal',
  templateUrl: './songs-modal.page.html',
  styleUrls: ['./songs-modal.page.scss'],
})
export class SongsModalPage {
  option: number;
  songs: any[];
  name: string;

  constructor(
      private navParams: NavParams,
      private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.option = this.navParams.data.option;
    this.songs = this.navParams.data.songs;
    this.name = this.navParams.data.name;
  }

  async selectSong(song) {
    await this.modalController.dismiss(song);
  }

}

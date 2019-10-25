import { Component } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {PlatziMusicService} from "../../services/platzi-music.service";
import {SongsModalPage} from "../songs-modal/songs-modal.page";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  slideOps = {
    initialSlide: 2,
    slidesPerView: 4,
    centeredSlides: true,
    speed: 400
  };
  songs: any[] = [];
  albums: any[] = [];
  artists: any[] = [];
  song: {
    preview_url: string;
    playing: boolean;
    name: string;
  } = {
    preview_url: "",
    playing: false,
    name: ""
  };
  currentSong: HTMLAudioElement;
  newTime;
  constructor(
      private musicService: PlatziMusicService,
      private modalController: ModalController
  ) {}

  ionViewDidEnter() {
    this.musicService.getNewReleases().then(newReleases => {
      this.artists = this.musicService.getArtists();
      //console.log(this.artists);
      this.songs = newReleases.albums.items.filter(
          e => e.album_type == "single"
      );
      //console.log(this.songs);
      this.albums = newReleases.albums.items.filter(
          e => e.album_type == "album"
      );
      //console.log(this.albums);
    });
  }

  async showSongs(object, option) {
    if(option === 1) {
      const data = await this.musicService.getArtistTopTracks(object.id);
      var songs = data.tracks;
    } else {
      if(option === 2) {
        const data = await this.musicService.getAlbumTracks(object.id);
        var songs = data.items;
      } else {
        if(option === 3) {
          songs = [];
          this.song = object;
        }
      }
    }

    if(option < 3) {
      //console.log(songs);
      const modal = await this.modalController.create({
        component: SongsModalPage,
        componentProps: {
          option: option,
          songs: songs,
          name: object.name
        }
      });

      modal.onDidDismiss().then(dataRetuned => {
        if(dataRetuned.data !== null) {
          this.song = dataRetuned.data;
        } else {
          this.song = {
            preview_url: "",
            playing: false,
            name: ""
          };
          this.currentSong = null;
          this.newTime = 0;
        }
      });

      return await modal.present();
    } else {
      return null;
    }
  }

  play() {
    this.currentSong = new Audio(this.song.preview_url);
    this.currentSong.play();
    this.currentSong.addEventListener("timeupdate", () => {
      this.newTime =
          (this.currentSong.currentTime * (this.currentSong.duration / 10)) / 100;
    });
    this.song.playing = true;
  }

  pause() {
    this.currentSong.pause();
    this.song.playing = false;
  }

  parseTime(time: number) {
    if (time) {
      const partTime = parseInt(time.toString().split(".")[0], 10);
      let minutes = Math.floor(partTime / 60).toString();
      if (minutes.length == 1) {
        minutes = "0" + minutes;
      }
      let seconds = (partTime % 60).toString();
      if (seconds.length == 1) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    }
  }
}

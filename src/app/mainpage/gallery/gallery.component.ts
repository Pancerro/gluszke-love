import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
  })
  export class GalleryComponent implements OnInit {
    imageObject: Array<object> = [
      {
        image: 'assets/gallery/image/1.jpg',
        thumbImage: 'assets/gallery/image/1.jpg',
        alt: 'A kto tu pije alkochol! Martusia!',
        title: 'A kto tu pije alkochol! Martusia!'
      },
      {
        image: 'assets/gallery/image/2.jpg',
        thumbImage: 'assets/gallery/image/2.jpg',
        title: 'Pierwszy dzien z ptakow, pierwszy dzien bez szalika',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/3.jpg',
        thumbImage: 'assets/gallery/image/3.jpg',
        title: 'A kto ma czapke od niusi? Wygladalas w niej seksownie!',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/4.jpg',
        thumbImage: 'assets/gallery/image/4.jpg',
        title: 'A kto juz nie pali shishy? Adris i Martusia',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/5.jpg',
        thumbImage: 'assets/gallery/image/5.jpg',
        title: 'Adris bo ja Cie zabiore do moona...',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/6.jpg',
        thumbImage: 'assets/gallery/image/6.jpg',
        title: 'I nic sie nie zmienilo!',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/7.jpg',
        thumbImage: 'assets/gallery/image/7.jpg',
        title: 'Dla Ciebie moge nosic cale dnie!',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/8.jpg',
        thumbImage: 'assets/gallery/image/8.jpg',
        title: 'A kto sie z nami pieknymi bawi? Bezon',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/9.jpg',
        thumbImage: 'assets/gallery/image/9.jpg',
        title: 'Mysle sobie Martusiu, bo mi cos sie urwalo',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/10.jpg',
        thumbImage: 'assets/gallery/image/10.jpg',
        title: 'A kto ma ponetne i calusne usta!? no kto!',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/11.jpg',
        thumbImage: 'assets/gallery/image/11.jpg',
        title: 'Walentykowy prezent! Spidermenkowy',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/12.jpg',
        thumbImage: 'assets/gallery/image/12.jpg',
        title: 'Adris bo ja cie zapraszam na stejka...',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/13.jpg',
        thumbImage: 'assets/gallery/image/13.jpg',
        title: 'Gluszkinka Dwie Kawki',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/14.jpg',
        thumbImage: 'assets/gallery/image/14.jpg',
        title: 'Pamietam ze mialas sie podzielic ze mna i co? Ucieklas!',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/15.jpg',
        thumbImage: 'assets/gallery/image/15.jpg',
        title: 'Adris zaskoczony buziakiem',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/16.jpg',
        thumbImage: 'assets/gallery/image/16.jpg',
        title: 'Niespodziewany skrzat!',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/17.jpg',
        thumbImage: 'assets/gallery/image/17.jpg',
        title: 'A tak powininem sie ubierac i nie mow ze nie!',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/18.jpg',
        thumbImage: 'assets/gallery/image/18.jpg',
        title: 'Ale ja meski... mrr...',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/19.jpg',
        thumbImage: 'assets/gallery/image/19.jpg',
        title: 'A kto tu planuje wyrzucic gluszka na tory?!',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/20.jpg',
        thumbImage: 'assets/gallery/image/20.jpg',
        title: 'ENERGYLANDIA USMIECH I BAJKA',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/21.jpg',
        thumbImage: 'assets/gallery/image/21.jpg',
        title: 'Adris kocha zoo mniej niz Gluszka!',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/22.jpg',
        thumbImage: 'assets/gallery/image/22.jpg',
        title: 'Ale usmiechnieci i radosni',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/23.jpg',
        thumbImage: 'assets/gallery/image/23.jpg',
        title: 'Uwazam ze powinnas miec tego krolika!',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/24.jpg',
        thumbImage: 'assets/gallery/image/24.jpg',
        title: 'Pamietam ze z nami byl arbuz...',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/25.jpg',
        thumbImage: 'assets/gallery/image/25.jpg',
        title: 'A ty caluj mnie!',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/26.jpg',
        thumbImage: 'assets/gallery/image/26.jpg',
        title: 'Martusia ktora juz planuje ze to Adris bedzie wszystko nosil',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/27.jpg',
        thumbImage: 'assets/gallery/image/27.jpg',
        title: 'Adris z zazdroscia patrzy na drinka Tusi',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/28.jpg',
        thumbImage: 'assets/gallery/image/28.jpg',
        title: 'Ale kiedys bylem przystojny... Te spojrzenie!',
        alt: 'Image alt'
      },
      {
        image: 'assets/gallery/image/29.jpg',
        thumbImage: 'assets/gallery/image/29.jpg',
        title: 'Pamietam... pamietam ze musialas kupke po tym wszystkim!',
        alt: 'Image alt'
      }
    ];
  private audioNewMessage = new Audio();
  constructor(private router: Router) { }

    ngOnInit() {
    }
    public return(): void {
      this.router.navigate(['/main-page']);
    }
    public arrowClick(event): void {
      if (event.toString().localeCompare('next')) {
        this.playAudio('assets/gallery/sounds/next.mp3');
      } else {
        this.playAudio('assets/gallery/sounds/previous.mp3');
      }
    }
  public playAudio(audio: string): void {
    this.audioNewMessage.src = audio;
    this.audioNewMessage.load();
    this.audioNewMessage.play();
  }
  }

import { trigger, transition, animate, style } from '@angular/animations';
import {Component, ElementRef, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {EventCard} from '../../model/event-card';

@Component({
  selector: 'app-starterpage',
  templateUrl: './starterpage.component.html',
  styleUrls: ['./starterpage.component.css'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            animate('4s ease-out', style({ // ->
              transform: 'rotateY(180deg) rotateZ(90deg) ',
            })),
            animate('4s ease-out', style({
              transform: 'translateX(50%) translateY(20%)', // |
            })),
            animate('4s ease-out', style({
              transform: 'translateX(-50%) translateY(20%)', // <-
            })),
            animate('4s ease-out', style({
              transform: 'translateX(-50%) translateY(0%)',
            })), // |

            animate('4s ease-out', style({
              transform: 'rotateY(270deg) rotateZ(270deg) translateX(0%) translateY(0%)',
            })),
            animate('4s ease-out', style({
              transform: 'scale(0.55) rotateY(360deg) rotateZ(360deg) translateX(0%) translateY(0%)',
            })),
            animate('4s ease-out', style({
              transform: 'scale(1) rotateY(360deg) rotateZ(360deg) translateX(0%) translateY(0%)',
            })),
          ]),
      ]
    ),

    trigger('sheldon', [
      transition(':enter', [
        animate('0s ease-out', style({
          opacity: 1
        })),
        animate('3s ease-out', style({
          transform: 'translateX(50%) translateY(50%)',
        })),
        animate('3s ease-out', style({
          opacity: 0,
          background: ' url(assets/animatedImage/fajerwerki.jpg)',
        })),
        animate('3s ease-out', style({
          transform: 'translateX(0) translateY(0)',
        })),
        animate('3s ease-out', style({
          opacity: 1,
          background: ' url(assets/animatedImage/fajerwerki.jpg)',
        })),
      ])
    ]),

    trigger('breakingBad', [
      transition(':enter', [
        animate('0s ease-out', style({
          opacity: 1
        })),
        animate('3s ease-out', style({
          transform: 'translateX(-50%) translateY(50%)',
        })),
        animate('3s ease-out', style({
          opacity: 0,
          background: ' url(assets/animatedImage/fajerwerki.jpg)',
        })),
        animate('3s ease-out', style({
          transform: 'translateX(0) translateY(0)',
        })),
        animate('3s ease-out', style({
          opacity: 1,
          background: ' url(assets/animatedImage/fajerwerki.jpg)',
        })),
      ])
    ]),
    trigger('rickAndMorty', [
      transition(':enter', [
        animate('0s ease-out', style({
          opacity: 1
        })),
        animate('3s ease-out', style({
          transform: 'translateX(-50%) translateY(-50%)',
        })),
        animate('3s ease-out', style({
          opacity: 0,
          background: ' url(assets/animatedImage/fajerwerki.jpg)',
        })),
        animate('3s ease-out', style({
          transform: 'translateX(0) translateY(0)',
        })),
        animate('3s ease-out', style({
          opacity: 1,
          background: ' url(assets/animatedImage/fajerwerki.jpg)',
        })),
      ])
    ]),
    trigger('grinch', [
      transition(':enter', [
        animate('0s ease-out', style({
          opacity: 1
        })),
        animate('3s ease-out', style({
          transform: 'translateX(50%) translateY(-50%)',
        })),
        animate('3s ease-out', style({
          opacity: 0,
          background: ' url(assets/animatedImage/fajerwerki.jpg)',
        })),
        animate('3s ease-out', style({
          transform: 'translateX(0) translateY(0)',
        })),
        animate('3s ease-out', style({
          opacity: 1,
          background: ' url(assets/animatedImage/fajerwerki.jpg)',
        })),
      ])
    ]),
    trigger('fireworks', [
      transition(':enter', [
        animate('6s 6s ease-out', style({
          opacity: 1
        })),
      ])
    ]),
    trigger('bumbum', [
      transition(':enter', [
        animate('0s  ease-out', style({
          display: 'block',
          opacity: 0
        })),
        animate('3s 13s ease-out', style({
          opacity: 1,
        })),
        animate('3s  ease-out', style({
          transform: 'translateX(0) translateY(-150%)',
        })),
        animate('5s ease-out', style({
          opacity: 0,
          background: ' url(assets/animatedImage/fajerwerki.jpg)',
        }))
      ])
    ]),

  ]

})
export class StarterpageComponent implements OnInit {
  private audioNewMessage = new Audio();
  private index: number;
  private eventCards: EventCard[] = [
    {
      urlLogo: 'assets/starterpage/text/birthdaysLogo.png',
      urlUnderLogo: 'assets/starterpage/text/christmasUnderLogo.png',
      urlVideo: 'https://firebasestorage.googleapis.com/v0/b/lovemartusia-7b0e9.appspot.com/o/WIN_20201230_10_56_25_Pro.mp4?alt=media&token=f31151ff-e66b-47e5-b5bc-3a09011c2d78',
      urlUnderVideo: 'assets/starterpage/text/christmasUnderVideo.png',
      urlCenterImage: 'assets/starterpage/animatedImage/fireworks.jpg',
      urlRightCornerImage: 'assets/starterpage/image/christmasTree.png',
      urlLeftCornerImage: 'assets/starterpage/image/christmasGift.png'
    },
    {
      urlLogo: 'assets/starterpage/text/birthdaysLogo.png',
      urlUnderLogo: 'assets/starterpage/text/birthdaysUnderLogo.png',
      urlVideo: 'assets/urodzinowe.mp4',
      urlUnderVideo: 'assets/starterpage/text/birthdaysUnderVideo.png',
      urlCenterImage: 'assets/starterpage/animatedImage/bigos.jpg',
      urlRightCornerImage: 'assets/starterpage/image/czapka.png',
      urlLeftCornerImage: 'assets/starterpage/image/balony.png'
    },
    {
      urlLogo: 'assets/starterpage/text/valentineLogo.png',
      urlUnderLogo: 'assets/starterpage/text/valentineUnderLogo.png',
      urlVideo: 'assets/valentine.mp4',
      urlUnderVideo: 'assets/starterpage/text/valentineUnderVideo.png',
      urlCenterImage: 'assets/starterpage/animatedImage/valentine.jpg',
      urlRightCornerImage: 'assets/starterpage/image/hearthValentine.png',
      urlLeftCornerImage: 'assets/starterpage/image/bearValentine.png'
    },
    ];
  public eventCard: EventCard;
  public animated = true;
  constructor(public router: Router, private elRef: ElementRef) { }

  ngOnInit() {
    this.eventCard = this.eventCards[this.eventCards.length - 1];
    this.index = this.eventCards.length - 1;
    this.audioNewMessage.src = 'assets/MichalWisniewski.mp3';
    this.audioNewMessage.load();
    this.audioNewMessage.play();
    setTimeout(() => this.audioNewMessage.play(), 1);
    setTimeout(() => this.animated = false, 18000);
  }

  public next(): void {
    this.router.navigate(['/main-page']).then(
      () => this.audioNewMessage.pause()
    );
  }
  public nextEvent(): void {
    if (this.index === this.eventCards.length - 1) {
      this.index = 0;
    } else { this.index++; }
    this.eventCard = this.eventCards[this.index];
    const player = this.elRef.nativeElement.querySelector('video');
    player.load();
  }
  public previousEvent(): void {
    if (this.index === 0) {
      this.index = this.eventCards.length - 1;
    } else { this.index--; }
    this.eventCard = this.eventCards[this.index];
    const player = this.elRef.nativeElement.querySelector('video');
    player.load();
  }
}


import { Component, OnInit } from '@angular/core';
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectCard } from "./project-card";

import {
  AccessibilityConfig,
  Action,
  ButtonEvent,
  ButtonsConfig,
  ButtonsStrategy,
  ButtonType,
  Description,
  DescriptionStrategy,
  DotsConfig,
  GalleryService,
  Image,
  ImageModalEvent,
  KS_DEFAULT_BTN_CLOSE,
  KS_DEFAULT_BTN_DELETE,
  KS_DEFAULT_BTN_DOWNLOAD,
  KS_DEFAULT_BTN_EXTURL,
  KS_DEFAULT_BTN_FULL_SCREEN,
  // KS_DEFAULT_BTN_ROTATE,
  PreviewConfig,
  LoadingConfig,
  LoadingType,
  CurrentImageConfig
} from '@ks89/angular-modal-gallery';


declare var Typewriter: any;
declare var AOS: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  format: string = this.canUseWebP() ? "webp" : "png";
  isGalleryOpen = false;
  imageIndex = 1;
  galleryId = 1;
  isPlaying = true;
  gallery1: Image[] = [
    new Image(0, {
      img: '../assets/projects/project-hydra-ss/desktop-tactical.'+this.format,
    }),
    new Image(1, {
      img: '../assets/projects/project-hydra-ss/desktop.'+this.format,
    }),
    new Image(2, {
      img: '../assets/projects/project-hydra-ss/mobile.'+this.format,
    }),
    new Image(3, {
      img: '../assets/projects/project-hydra-ss/web.'+this.format,
    }),
    new Image(4, {
      img: '../assets/projects/project-hydra-ss/web1.'+this.format,
    })
  ];

  gallery2: Image[] = [
    new Image(0, {
      img: '../assets/projects/chinczyk-ss/match.'+this.format,
    }),
    new Image(1, {
      img: '../assets/projects/chinczyk-ss/menu.'+this.format,
    }),
  ];

  gallery3: Image[] = [
    new Image(0, {
      img: '../assets/projects/beer-ss/beer1.'+this.format,
    }),
    new Image(1, {
      img: '../assets/projects/beer-ss/beer2.'+this.format,
    }),
    new Image(2, {
      img: '../assets/projects/beer-ss/beer3.'+this.format,
    }),
    new Image(3, {
      img: '../assets/projects/beer-ss/beer4.'+this.format,
    }),
    new Image(4, {
      img: '../assets/projects/beer-ss/beer5.'+this.format,
    })
  ];

  gallery4: Image[] = [
    new Image(0, {
      img: '../assets/projects/domino-ss/domino1.'+this.format,
    }),
    new Image(1, {
      img: '../assets/projects/domino-ss/domino2.'+this.format,
    }),
    new Image(2, {
      img: '../assets/projects/domino-ss/domino3.'+this.format,
    }),
    new Image(3, {
      img: '../assets/projects/domino-ss/domino4.'+this.format,
    }),
    new Image(4, {
      img: '../assets/projects/domino-ss/domino5.'+this.format,
    }),
    new Image(5, {
      img: '../assets/projects/domino-ss/domino6.'+this.format,
    })
  ];

  gallery5: Image[] = [
    new Image(0, {
      img: '../assets/projects/merc-ss/merc1.'+this.format,
    }),
    new Image(1, {
      img: '../assets/projects/merc-ss/merc2.'+this.format,
    }),
    new Image(2, {
      img: '../assets/projects/merc-ss/merc3.'+this.format,
    }),
    new Image(3, {
      img: '../assets/projects/merc-ss/merc4.'+this.format,
    }),
    new Image(4, {
      img: '../assets/projects/merc-ss/merc5.'+this.format,
    }),
    new Image(5, {
      img: '../assets/projects/merc-ss/merc6.'+this.format,
    }),
    new Image(6, {
      img: '../assets/projects/merc-ss/merc7.'+this.format,
    }),
    new Image(7, {
      img: '../assets/projects/merc-ss/merc8.'+this.format,
    }),
    new Image(8, {
      img: '../assets/projects/merc-ss/merc9.'+this.format,
    }),
  ];

  constructor(private galleryService: GalleryService){}

  title = 'Portfolio';
  projectCards: ProjectCard[] = [];
  ngOnInit(): void{
    AOS.init({
      once: true
    });

    //console typing effect
    this.typeWrite();

    gsap.registerPlugin(ScrollToPlugin, ScrollTrigger);

    //skills animation effect
    this.animateWebExample();
    this.animateCodeExample();
    this.animateDesktopExample();
    this.animateAndroid();
    //parallax effect
    this.parallaxImage();

    //project cards
    this.initializeProjectCards();
  }

  typeWrite(){
    var writter:any = new Typewriter('#console1',{
      delay:10
    });
    writter.typeString("Hello, <br>")
    .pauseFor(200)
    .typeString("I'm")
    .deleteChars(3)
    .typeString('my name is<span style="color: #27ae60;"> Karol Chryczyk</span>.<br>I am a graduate of IT studies and a programming hobbyist.')
    .typeString("<br>I'm mainly focused on full-stack development, but I also like working in other platforms.")
    .typeString("<br>My goal is to write cleaner and better code everyday.")
    .typeString('<br>This is my portfolio. If you want to see my work scroll down.')
    .typeString("<br>Enjoy.")
    .typeString("<br><span style='color:red'> This website is still in the early version of development. </span> <br>")
    .deleteChars(1)
    .typeString(" :)")
    .start();
  }

  parallaxImage(){
    gsap.to("#par-projects", {
      backgroundPosition: "50% 0%",
      ease: "power1",
      scrollTrigger: {
        trigger: "#par-projects",
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
      }});
  }

  animateWebExample(){
    gsap.timeline({
      defaults:{
        ease: "power3",
        duration: 0.5
      },
      scrollTrigger:{
        trigger:"#frontend",
        start:"top bottom",
        end:"bottom top",
        toggleActions: "play pause resume reset"
      }
    })
    .from("#layer1", {opacity:0})
    //ADD steps
    .add("firstStep")
    .add("secondStep", "+=0.5")
    .add("thirdStep", "+=1")
    //ANIM elements
    .from("#HeaderGroup", {y:-100},"firstStep")
    .from("#MenuGroup", {x:-100},"firstStep")
    .from("#ContentGroup", {y:100}, "firstStep")
    .from("#Logo, #NameBox", {scale: 0, transformOrigin: "center"}, "secondStep")
    .from(".MenuItems", {y: 50, stagger:0.1, opacity:0 }, "thirdStep")
    .from(".PageText", {scaleX:0, ease: "back", stagger: 0.1}, "thirdStep")
    .from("#PageImage", {x:50, opacity:0, ease: "back"}, "secondStep")
    .from("#PageConfirmBtn", {fill: "gray"},"secondStep")
  }

  animateCodeExample(){
    gsap.set("#BigGear", {scale: 0.9, transformOrigin: "center"})
    gsap.timeline({
      defaults:{
        ease: "power3",
        duration: 0.5
      },
      scrollTrigger:{
        trigger:"#backend",
        start:"top bottom",
        end:"bottom top",
        toggleActions: "play pause resume reset"
      }
    })
    .from("#CodeLayer1", {opacity:0})
    //ADD steps
    .add("firstStep")
    .add("secondStep", "+=0.5")
    .add("thirdStep", "+=1")
    //ANIM elements
    .from("#CodeGroup", {y:100}, "firstStep")
    .from(".SqlFragment", {y:100, stagger:0.1}, "firstStep")
    .from(".Gear", {scale:0, transformOrigin:"center", stagger:0.1}, "firstStep")
    .from("#CodeBg", {y:-100, opacity:0}, "secondStep")
    .to("#MediumGear", {rotate: 360, repeat: -1, transformOrigin:"center", ease: "linear", duration:4}, "secondStep")
    .to("#SmallGear", {rotate: -360, repeat: -1, transformOrigin:"center", ease: "linear", duration:2}, "secondStep")
    .to("#BigGear", {rotate: 360, repeat: -1, transformOrigin:"center", ease: "linear", duration:5}, "thirdStep")
    .to(".CodeArrow", {y:-10, stagger:.1, ease:"power2"}, "thirdStep")
    .to(".CodeArrow", {y: 0, stagger:.1, ease:"bounce"})
  }

  animateDesktopExample(){
    gsap.timeline({
      defaults:{
        ease: "power3",
        duration: 0.5
      },
      scrollTrigger:{
        trigger:"#desktop",
        start:"top bottom",
        end:"bottom top",
        toggleActions: "play pause resume reset"
      }
    })
    .from("#ScreenGroup", {y:300, duration:.75})
    .from("#DesktopAppGroup", {scale: 0, transformOrigin: "center", ease: "back", duration:.5});
  }

  animateAndroid(){
    gsap.timeline({
      defaults:{
        ease: "power3",
        duration: .5
      },
      scrollTrigger:{
        trigger:"#mobile",
        start:"top bottom",
        end:"bottom top",
        toggleActions: "play pause resume reset"
      }
    })
    .from("#MobileGroup", {y:300, duration:.75})
    .from(".AndroidMan", {y:100, stagger: 0.1})
    .fromTo("#AndroidHand",{rotate:150, transformOrigin: "50% 10%"}, {rotate:180, transformOrigin: "50% 10%", repeat:-1, yoyo:true, ease: "power1.inOut", duration: .65})
  }

  initializeProjectCards(){
    this.projectCards.push(
      {
        title: "Project Hydra",
        description: "Cross-platform app that helps management of the paramilitary unit. Provide functions for administrators and users. Desktop application has built-in tactical scenario editor. Made with: Angular, ASP.NET Core, Xamarin, WPF.",
        imageName: "hydra_logo."+this.format,
        repositoryLink: "https://github.com/Rolczak/PracaInz-ProjectHydra",
        secondLink: "https://github.com/Rolczak/ProjectHydraWEB",
        galleryId: 1
      },
      {
        title: "Gra u Chińczyka",
        description: "Augmented Reality multiplayer game for Android devices.",
        imageName: "chinczyk_logo."+this.format,
        repositoryLink: "https://gitlab.com/inzynierzy/gra-u-chinczyka",
        downloadLink: "https://play.google.com/store/apps/details?id=com.MicKarDevs.Gra_u_Chinczyka",
        galleryId: 2
      },
      {
        title: "Beer App",
        description: "Android application that helps monitor yout blood alcohol content.",
        imageName: "beer_logo."+this.format,
        repositoryLink: "https://gitlab.com/beer-time/beer-time",
        downloadLink: "https://play.google.com/store/apps/details?id=com.rol_dyn.beerapp",
        galleryId: 3
      },
      {
        title: "Restauracja u Domino",
        description: "App for restaurant management. Provide functions for administrators (managing), employees (reservation overview), users (making reservations) and guests (overview menu).",
        imageName: "domino_logo."+this.format,
        repositoryLink: "https://gitlab.com/inzynierzy/restauracja-u-domino",
        galleryId: 4
      },
      {
        title: "Mercenaries",
        description: "RPG browser game base made with Laravel 5, MySql and Bootstrap where players can fight each others on PVP area, take contracts and campaign missions, train, buy and change equipment and many more.",
        imageName: "merc_logo."+this.format,
        repositoryLink: "https://github.com/Rolczak/Mercenaries",
        galleryId: 5
      }
    );
  }

  openModalViaService(id: number | undefined, index: number) {
    console.log('opening gallery with index ' + index);
    this.isGalleryOpen = true;
    this.galleryService.openGallery(id, index);
  }

  canUseWebP() {
    var elem = document.createElement('canvas');
    if (!!(elem.getContext && elem.getContext('2d'))) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    }
    return false;
}

}


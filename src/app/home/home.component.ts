import { Component, Input, OnDestroy, OnInit } from '@angular/core';


export interface CarouselItem {
  id: number; // Unique identifier for the carousel item
  imageUrl: string; // URL of the image for the carousel item
  altText: string; // Alt text for the image
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  carouselItems: CarouselItem[] = [
    { id: 1, imageUrl: 'https://mdbcdn.b-cdn.net/img/new/slides/041.webp', altText: 'Wild Landscape' },
    { id: 2, imageUrl: 'https://mdbcdn.b-cdn.net/img/new/slides/042.webp', altText: 'Camera' },
    { id: 3, imageUrl: 'https://mdbcdn.b-cdn.net/img/new/slides/043.webp', altText: 'Exotic Fruits' },
    // Add more items as needed
  ];
  currentSlideIndex = 0;
  slideInterval = 5000;
   constructor(){}


   ngOnInit(): void {
    this.startSlideInterval();
   }
   startSlideInterval() {
    setInterval(() => {
      this.nextSlide();
    }, this.slideInterval);
  }
 

   prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
  }

  // Function to go to the next slide
  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.carouselItems.length;
  }






  ngOnDestroy(): void {
    
  }
}

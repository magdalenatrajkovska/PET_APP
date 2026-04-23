import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetCardComponent } from '../pet-card/pet-card';
import { PetService } from '../../services/pet.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PetCardComponent,],
  templateUrl: './home.html'
})
export class HomeComponent {

  pets: any[] = [];

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.pets = this.petService.getPets();
  }
  showScrollTop = false;

@HostListener('window:scroll', [])
onWindowScroll() {
  this.showScrollTop = window.scrollY > 300;
}

scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetCardComponent } from '../pet-card/pet-card';
import { PetService } from '../../services/pet.service';

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
}
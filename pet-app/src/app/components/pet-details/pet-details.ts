import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PetService } from '../../services/pet.service';
import { CommonModule } from '@angular/common';
import { Pet } from '../../models/pet';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-details.html'
})
export class PetDetailsComponent {

  pet: Pet | undefined;

  constructor(
    private route: ActivatedRoute,
    private petService: PetService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pet = this.petService.getPetById(id);
  }
}
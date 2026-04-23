import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../services/pet.service';
import { Pet } from '../../models/pet';
import { PetCardComponent } from '../pet-card/pet-card';

@Component({
  selector: 'app-match',
  standalone: true,
  imports: [CommonModule, FormsModule, PetCardComponent],
  templateUrl: './match.html'
})
export class MatchComponent implements OnInit {

  types: string[] = [];
  pets: Pet[] = [];
  results: Pet[] = [];

  form: any = {
    types: [],
    energyLevel: 2,
    spaceNeed: 2,
    careLevel: 2,
    goodWithKids: false,
    goodWithPets: false
  };

  constructor(private petService: PetService) {}

  ngOnInit() {
    this.types = this.petService.getTypes();
    this.pets = this.petService.getPets();
  }

  mapLevel(value: number) {
    return ['Low', 'Medium', 'High'][value - 1];
  }

  toggleType(type: string) {
    if (this.form.types.includes(type)) {
      this.form.types = this.form.types.filter((t: string) => t !== type);
    } else {
      this.form.types.push(type);
    }
  }

  findMatch() {
    const user = {
      ...this.form,
      energyLevel: this.mapLevel(this.form.energyLevel),
      spaceNeed: this.mapLevel(this.form.spaceNeed),
      careLevel: this.mapLevel(this.form.careLevel)
    };

    let scoredPets = this.pets.map(pet => {
      let score = 0;

      // 🔥 TYPE MATCH (very important)
      if (user.types.length > 0) {
        if (user.types.includes(pet.type)) {
          score += 3;
        } else {
          score -= 2;
        }
      }

      if (pet.energyLevel === user.energyLevel) score++;
      if (pet.spaceNeed === user.spaceNeed) score++;
      if (pet.careLevel === user.careLevel) score++;

      if (!user.goodWithKids || pet.goodWithKids) score++;
      if (!user.goodWithPets || pet.goodWithPets) score++;

      return { pet, score };
    });

    // Sort descending
    scoredPets.sort((a, b) => b.score - a.score);

    // Take top 3
    this.results = scoredPets.slice(0, 3).map(x => x.pet);

    // 🔥 scroll to results
    setTimeout(() => {
      const el = document.getElementById('resultsSection');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }
}
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../services/pet.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-pet.html'
})
export class AddPetComponent implements OnInit{

  pet: any = {
    name: '',
    type: '',
    customType: '',
    age: 1,
    energyLevel: 2,
    spaceNeed: 2,
    careLevel: 2,
    description: '',
    imageUrl: '',
    goodWithKids: false,
    goodWithPets: false
  };
  types: string[] = [];

ngOnInit() {
  this.types = this.petService.getTypes();
}

  constructor(
    private petService: PetService,
    private router: Router
  ) {}

  mapLevel(value: number) {
    return ['Low', 'Medium', 'High'][value - 1];
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      this.pet.imageUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
   let finalType = this.pet.type;

if (this.pet.type === 'Other' && this.pet.customType) {
  finalType = this.pet.customType;
  this.petService.addType(finalType); // 🔥 save new type
}
    const newPet = {
      ...this.pet,
      type: finalType,
      energyLevel: this.mapLevel(this.pet.energyLevel),
      spaceNeed: this.mapLevel(this.pet.spaceNeed),
      careLevel: this.mapLevel(this.pet.careLevel)
    };

    this.petService.addPet(newPet);
    this.router.navigate(['/']);
  }
}
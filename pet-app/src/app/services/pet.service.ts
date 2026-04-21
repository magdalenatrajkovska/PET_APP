import { Injectable } from '@angular/core';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {

private pets: Pet[] = [
  {
    id: 1,
    name: 'Max',
    type: 'Dog',
    age: 2,
    energyLevel: 'High',
    spaceNeed: 'Large',
    careLevel: 'Medium',
    goodWithKids: true,
    goodWithPets: false,
    description: 'Very active and playful dog',
    imageUrl: 'https://placedog.net/400/300'
  },
  {
    id: 2,
    name: 'Luna',
    type: 'Cat',
    age: 1,
    energyLevel: 'Low',
    spaceNeed: 'Small',
    careLevel: 'Easy',
    goodWithKids: true,
    goodWithPets: true,
    description: 'Calm indoor cat',
    imageUrl: 'https://placekitten.com/401/302'
  },
  {
    id: 3,
    name: 'Charlie',
    type: 'Dog',
    age: 4,
    energyLevel: 'Medium',
    spaceNeed: 'Medium',
    careLevel: 'Medium',
    goodWithKids: true,
    goodWithPets: true,
    description: 'Friendly and loyal companion',
    imageUrl: 'https://placedog.net/402/303'
  },
  {
    id: 4,
    name: 'Bella',
    type: 'Rabbit',
    age: 2,
    energyLevel: 'Low',
    spaceNeed: 'Small',
    careLevel: 'Easy',
    goodWithKids: true,
    goodWithPets: true,
    description: 'Gentle rabbit that loves carrots',
    imageUrl: 'https://placekitten.com/402/304'
  },
  {
    id: 5,
    name: 'Rocky',
    type: 'Dog',
    age: 5,
    energyLevel: 'High',
    spaceNeed: 'Large',
    careLevel: 'Hard',
    goodWithKids: false,
    goodWithPets: true,
    description: 'Strong and protective guard dog',
    imageUrl: 'https://placedog.net/403/305'
  },
  {
    id: 6,
    name: 'Milo',
    type: 'Cat',
    age: 3,
    energyLevel: 'Medium',
    spaceNeed: 'Small',
    careLevel: 'Medium',
    goodWithKids: true,
    goodWithPets: false,
    description: 'Curious cat that loves exploring',
    imageUrl: 'https://placekitten.com/403/306'
  },
  {
    id: 7,
    name: 'Daisy',
    type: 'Hamster',
    age: 1,
    energyLevel: 'High',
    spaceNeed: 'Small',
    careLevel: 'Easy',
    goodWithKids: true,
    goodWithPets: true,
    description: 'Tiny hamster that loves running on wheels',
    imageUrl: 'https://placekitten.com/404/307'
  },
  {
    id: 8,
    name: 'Buddy',
    type: 'Dog',
    age: 6,
    energyLevel: 'Low',
    spaceNeed: 'Medium',
    careLevel: 'Medium',
    goodWithKids: true,
    goodWithPets: true,
    description: 'Older dog, calm and affectionate',
    imageUrl: 'https://placedog.net/404/308'
  },
  {
    id: 9,
    name: 'Coco',
    type: 'Parrot',
    age: 7,
    energyLevel: 'High',
    spaceNeed: 'Medium',
    careLevel: 'Hard',
    goodWithKids: true,
    goodWithPets: false,
    description: 'Colorful parrot that mimics sounds',
    imageUrl: 'https://placekitten.com/405/309'
  },
  {
    id: 10,
    name: 'Oliver',
    type: 'Cat',
    age: 2,
    energyLevel: 'Medium',
    spaceNeed: 'Small',
    careLevel: 'Easy',
    goodWithKids: true,
    goodWithPets: true,
    description: 'Playful cat that loves chasing toys',
    imageUrl: 'https://placekitten.com/406/310'
  }
];


  getPets(): Pet[] {
    return this.pets;
  }

  getPetById(id: number): Pet | undefined {
    return this.pets.find(p => p.id === id);
  }
}
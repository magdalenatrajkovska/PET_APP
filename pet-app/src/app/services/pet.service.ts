import { Injectable } from '@angular/core';
import { Pet } from '../models/pet';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  constructor() {
  const saved = localStorage.getItem('pets');
  if (saved) {
    this.pets = JSON.parse(saved);
  }
}

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
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.naturalhistoryonthenet.com%2Fwp-content%2Fuploads%2F2016%2F12%2FDomestic-Cat.jpg&f=1&nofb=1&ipt=76d3ce2f38f94b5fb4e88a7c26c999d7288b0b86c9a5a3c4f9fd0db99a7523b5'
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
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flive.staticflickr.com%2F65535%2F51310231729_971cb42d84_b.jpg&f=1&nofb=1&ipt=ab00d256b1c95d2b238a212ed382d06fb12a9e392539d2f27f415543bc9e6b9c'
  },
  {
    id: 5,
    name: 'Rocky',
    type: 'Dog',
    age: 5,
    energyLevel: 'High',
    spaceNeed: 'Large',
    careLevel: 'High',
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
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdinoanimals.com%2Fwp-content%2Fuploads%2F2023%2F03%2FDomestic-cat-34.jpg&f=1&nofb=1&ipt=3ef58418e6c7b754baa4108d1e22e5dfb4f76ff79d59399ed4bfd26bd06f4135'
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
    description: 'Tiny hamster that loves',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fsp-ao.shortpixel.ai%2Fclient%2Fq_lossy%2Cret_img%2Cw_1000%2Fhttps%3A%2F%2Fwww.ukpets.com%2Fblog%2Fwp-content%2Fuploads%2F2023%2F03%2Fsyrian-hamster-colors-1.jpg&f=1&nofb=1&ipt=e7f0d4d03eb1f8b19c23ce2b2ce812de4712cd7d034d6414277cb069ce583033'
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
    careLevel: 'High',
    goodWithKids: true,
    goodWithPets: false,
    description: 'Colorful parrot that mimics sounds',
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%2Fid%2FOIP.WtJUUDtxA08Hd6po1Fv3TwHaEO%3Fpid%3DApi&f=1&ipt=1097964c907a19acb1cf62497d6a1d87f05b429f738a61cfadcab61c21002fd6&ipo=images'
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
    imageUrl: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.balisafarimarinepark.com%2Fwp-content%2Fuploads%2F2022%2F08%2FGettyImages-172050389-8ab8710.jpg&f=1&nofb=1&ipt=7eadd170537878aad6a456e71b29374f8a689afb2412b889ec431864edf6547b'
  }
];
private types: string[] = [
  'Dog',
  'Cat',
  'Rabbit',
  'Parrot',
  'Hamster'
];

getTypes(): string[] {
  return this.types;
}

addType(type: string) {
  const formatted = type.trim();

  if (!this.types.includes(formatted)) {
    this.types.push(formatted);
  }
}


  getPets(): Pet[] {
    return this.pets;
  }

  getPetById(id: number): Pet | undefined {
    return this.pets.find(p => p.id === id);
  }
addPet(pet: Pet) {
  const newPet: Pet = {
    ...pet,
    id: this.generateId()
  };

  this.pets.push(newPet);
localStorage.setItem('pets', JSON.stringify(this.pets));
}
private generateId(): number {
  return this.pets.length > 0
    ? Math.max(...this.pets.map(p => p.id)) + 1
    : 1;
}
}
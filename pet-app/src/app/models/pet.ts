export interface Pet {
  id: number;
  name: string;
  type: string;
  age: number;

  energyLevel: string;
  spaceNeed: string;
  careLevel: string;

  goodWithKids: boolean;
  goodWithPets: boolean;

  description: string;
  imageUrl: string;
}
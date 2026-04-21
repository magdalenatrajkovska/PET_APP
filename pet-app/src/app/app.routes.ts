
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home';
import { AddPetComponent } from './components/add-pet/add-pet';
import { MatchComponent } from './components/match/match';
import { PetDetailsComponent } from './components/pet-details/pet-details';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'add', component: AddPetComponent },
  { path: 'match', component: MatchComponent },
  { path: 'pet/:id', component: PetDetailsComponent }
];
// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { PetForumComponent } from './pet-forum.component';

bootstrapApplication(PetForumComponent, appConfig)
  .catch((err) => console.error(err));

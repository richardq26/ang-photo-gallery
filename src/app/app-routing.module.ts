import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoFormComponent } from './components/photo-form/photo-form.component';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoPreviewComponent } from './components/photo-preview/photo-preview.component';


const routes: Routes = [
  { path: 'photos', component: PhotoListComponent },
  { path: 'photos/new', component: PhotoFormComponent },
  { path: 'photos/:id', component: PhotoPreviewComponent },
  { path: '', redirectTo: 'photos', pathMatch: 'full'},
  { path: '**', pathMatch: 'full', redirectTo: 'photos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

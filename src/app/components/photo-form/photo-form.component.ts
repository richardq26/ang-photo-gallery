import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../services/photo.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
// Para que me dé el autocompletado en el onPhotoSelected
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.css']
})
export class PhotoFormComponent implements OnInit {
  loading = false;
  file: File;
  // El Photo Selected es el que va a reemplazar el icono de no imagen
  photoSelected: string | ArrayBuffer;
  constructor(private photoService: PhotoService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  onPhotoSelected(event: HtmlInputEvent): void {
    // Si existe una propiedad llamada files y el [0] para confirmar que al menos haya un elemento subido
    // El target de la interface
    if (event.target.files && event.target.files[0]) {
      this.file = (event.target.files[0] as File);
      // Image preview
      // Método para cambiar la imagen de no-img por la que se suba
      const reader = new FileReader();
      reader.onload = e => this.photoSelected = reader.result;
      reader.readAsDataURL(this.file);
    }
  }

  uploadPhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
    this.loading = true;
    this.photoService.createPhoto(title.value, description.value, this.file)
      .subscribe(res => {
        this.router.navigate(['/photos']);
        this.toastr.success('¡Foto agregada con éxito!', 'Foto añadida', { positionClass: 'toast-mid-left' });
        this.loading = false;
      }
        , err => console.log(err));
    
    return false;
  }

}


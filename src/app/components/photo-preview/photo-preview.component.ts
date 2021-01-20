import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../../services/photo.service';
import { Photo } from '../../interfaces/photo';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-photo-preview',
  templateUrl: './photo-preview.component.html',
  styleUrls: ['./photo-preview.component.css']
})
export class PhotoPreviewComponent implements OnInit {
  id: string;
  photo: Photo;
  constructor(private activeRoute: ActivatedRoute, private router: Router, private photoService: PhotoService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(params => {
      this.id = params.id;
      this.photoService.getPhoto(this.id)
        .subscribe(
          res => {
            this.photo = res;
            console.log(res);
          },
          err => console.log(err));
    });
  }

  deletePhoto(id: string) {
    this.photoService.deletePhoto(id)
      .subscribe(
        res => {
          this.router.navigate(['photos']);
          this.toastr.warning('La foto fue eliminada con éxito!', 'Foto eliminada', { positionClass: 'toast-bottom-right' });
        },
        err => console.log(err));
  }

  updatePhoto(title: HTMLInputElement, description: HTMLTextAreaElement): boolean {
    this.photoService.updatePhoto(this.id, title.value, description.value)
    .subscribe(
      res => {
        this.toastr.success('¡La foto fue actualizada con éxito!', 'Foto actualizada', { positionClass: 'toast-bottom-right'});
      },
      err => console.log(err)
    );
    // El return false cancela el evento, así no se recarga la página
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Titulo } from '../../models/titulo';
import { TituloService } from '../../services/titulo.service';

@Component({
  standalone: true,
  selector: 'app-titulos',
  imports: [CommonModule, FormsModule],
  templateUrl: './titulos.component.html',
  styleUrls: ['./titulos.component.css']
})
export class TitulosComponent implements OnInit {
  titulos: Titulo[] = [];
  model: Titulo = { denominacion: '' } as Titulo;
  editing = false;

  constructor(private svc: TituloService) {}

  ngOnInit(): void { this.load(); }

  load() { this.svc.list<Titulo>().subscribe((r) => this.titulos = r || []); }

  new() { this.model = { denominacion: '' } as Titulo; this.editing = true; }
  edit(t: Titulo) { this.model = { ...t }; this.editing = true; }

  save() {
    if (!this.model.id) {
      this.svc.create<Titulo>(this.model).subscribe(() => { this.load(); this.editing = false; });
    } else {
      this.svc.update<Titulo>(this.model.id!, this.model).subscribe(() => { this.load(); this.editing = false; });
    }
  }

  cancel() { this.editing = false; }

  remove(t: Titulo) {
    if (!t.id) return;
    if (!confirm('¿Eliminar título?')) return;
    this.svc.delete(t.id).subscribe(() => this.load());
  }
}

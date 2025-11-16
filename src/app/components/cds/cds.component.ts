import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cd } from '../../models/cd';
import { CdService } from '../../services/cd.service';

@Component({
  standalone: true,
  selector: 'app-cds',
  imports: [CommonModule, FormsModule],
  templateUrl: './cds.component.html',
  styleUrls: ['./cds.component.css']
})
export class CdsComponent implements OnInit {
  cds: Cd[] = [];
  model: Cd = { nroCd: '' } as Cd;
  editing = false;

  constructor(private svc: CdService) {}

  ngOnInit(): void { this.load(); }

  load() { this.svc.list<Cd>().subscribe((r) => this.cds = r || []); }

  new() { this.model = { nroCd: '' } as Cd; this.model.titulo = { id: undefined } as any; this.editing = true; }
  edit(c: Cd) { this.model = { ...c }; if (!this.model.titulo) { this.model.titulo = { id: undefined } as any; } this.editing = true; }

  save() {
    if (!this.model.id) {
      this.svc.create<Cd>(this.model).subscribe(() => { this.load(); this.editing = false; });
    } else {
      this.svc.update<Cd>(this.model.id!, this.model).subscribe(() => { this.load(); this.editing = false; });
    }
  }

  cancel() { this.editing = false; }

  remove(c: Cd) {
    if (!c.id) return;
    if (!confirm('¿Eliminar CD?')) return;
    this.svc.delete(c.id).subscribe(() => this.load());
  }
}

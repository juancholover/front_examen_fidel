import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Cliente } from '../../models/cliente';
import { ClienteService } from '../../services/cliente.service';

@Component({
  standalone: true,
  selector: 'app-clientes',
  imports: [CommonModule, FormsModule],
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: Cliente[] = [];
  model: Cliente = { nombre: '' } as Cliente;
  editing = false;

  constructor(private svc: ClienteService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.svc.list<Cliente>().subscribe((r) => this.clientes = r || []);
  }

  new() {
    this.model = { nombre: '' } as Cliente;
    this.editing = true;
  }

  edit(c: Cliente) {
    this.model = { ...c };
    this.editing = true;
  }

  save() {
    if (!this.model.id) {
      this.svc.create<Cliente>(this.model).subscribe(() => { this.load(); this.editing = false; });
    } else {
      this.svc.update<Cliente>(this.model.id!, this.model).subscribe(() => { this.load(); this.editing = false; });
    }
  }

  cancel() { this.editing = false; }

  remove(c: Cliente) {
    if (!c.id) return;
    if (!confirm('¿Eliminar cliente?')) return;
    this.svc.delete(c.id).subscribe(() => this.load());
  }
}

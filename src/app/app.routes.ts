import { Routes } from '@angular/router';
import { ClientesComponent } from './components/clientes/clientes.component';
import { TitulosComponent } from './components/titulos/titulos.component';

export const routes: Routes = [
	{ path: '', redirectTo: 'clientes', pathMatch: 'full' },
	{ path: 'clientes', loadComponent: () => import('./components/clientes/clientes.component').then(m => m.ClientesComponent) },
	{ path: 'titulos', loadComponent: () => import('./components/titulos/titulos.component').then(m => m.TitulosComponent) },
	{ path: 'sanciones', loadComponent: () => import('./components/sanciones/sanciones.component').then(m => m.SancionesComponent) },
	{ path: 'alquileres', loadComponent: () => import('./components/alquileres/alquileres.component').then(m => m.AlquileresComponent) },
	{ path: 'detalle-alquiler', loadComponent: () => import('./components/detalle-alquiler/detalle-alquiler.component').then(m => m.DetalleAlquilerComponent) },
	{ path: 'cds', loadComponent: () => import('./components/cds/cds.component').then(m => m.CdsComponent) }
];

import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  tiposInvitado = ['Humano', 'Fantasma', 'Vampiro', 'Bruja'];

  form = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    tipoInvitado: new FormControl('', Validators.required),
    disfraz: new FormControl('', Validators.required),
    fechaLlegada: new FormControl('', Validators.required),
    aceptaReglas: new FormControl(false, Validators.requiredTrue)
  });

  onSubmit() {
    if (this.form.valid) {
      alert(`🎃 ¡Bienvenido/a, ${this.form.value.nombre}! Tu entrada para la fiesta del castillo ha sido registrada con éxito.`);
      this.form.reset();
    } else {
      this.form.markAllAsTouched();
    }
  }

  getError(controlName: string) {
    const control = this.form.get(controlName);
    if (!control || !control.touched || control.valid) return '';
    
    if (control.errors?.['required']) return '👻 Este campo da más miedo vacío, ¡rellénalo!';
    if (control.errors?.['minlength']) return `👻 Mínimo ${control.errors['minlength'].requiredLength} caracteres, ¡no te asustes!`;
    if (control.errors?.['email']) return '🩸 Ese correo parece maldito… revisa el formato.';
    if (control.errors?.['requiredTrue']) return '☠️ Debes aceptar las reglas para entrar.';
    
    return '';
  }
}

import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido a Todo-App';
  tasks = signal([
    'Intalar Angular CLI',
    'Crear proyecto',
    'Crear componentes'
  ])
  person = signal({name:'juan',age:15})
  img = 'https://w3schools.com/howto/img_avatar.png';

  colorCtrl = new FormControl();
  widthCtrl = new FormControl(50,{nonNullable:true});
  classNameCtrl = new FormControl('',{
    nonNullable:true,
    validators:[
      Validators.required,
      Validators.minLength(3)
    ],
  });
  
  constructor(){
    this.colorCtrl.valueChanges.subscribe(value=>{
      console.log(value);
    })
  }
  changeName(event:Event){
    const input = event.target as HTMLInputElement
    this.person.update(person=>({...person,name:input.value}))
  }
}

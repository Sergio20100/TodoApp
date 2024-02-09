
import { Component, computed, signal, effect, OnInit, inject, Injector } from '@angular/core';
import { Task } from '../../models/task.model';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

type FilterType = 'all'|'pending' | 'completed'

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  tasks = signal<Task[]>([]);

  
  filter = signal<FilterType>('all')

  tasksByFilter = computed(()=>{
      const filter = this.filter();
      const tasks = this.tasks();
      
      switch(filter){
        case 'pending':{
          
          return tasks.filter(task=>!task.completed);
        }
        case 'completed':{
          return tasks.filter(task=>task.completed)
        }
        default:{
          return tasks
        }
      }
  })
  newTaskCtrl = new FormControl('',{
    nonNullable:true,
    validators: [
      Validators.required,
      // Validators.pattern(/^\S*$/)
    ]
  })

  injector = inject(Injector);
  constructor(){
    
  }
  
  ngOnInit(){
    const storage = localStorage.getItem('tasks')
    if(storage){
      const tasks:Task[] = JSON.parse(storage);
      this.tasks.set(tasks);
    }
    this.trackTasks();
  }
  // buenas practicas es usar Inject
  trackTasks(){
    effect(()=>{
      const tasks = this.tasks();
      console.log(tasks)
      localStorage.setItem('tasks',JSON.stringify(tasks))
   },{injector:this.injector})
  }
  changeFilter(filter:FilterType){
    this.filter.set(filter)
  }
  changeHandler(){
    if(this.newTaskCtrl.valid){
      const value = this.newTaskCtrl.value.trim(); // trim() quita los espacios al inicio y al final de la cadena de texto
      if(value != ''){ // si despues de quitar los escacios el campo no sigue vacio entonces se guarda el valor
        this.addTask(value);
        this.newTaskCtrl.setValue('')
      }
      
    }
  }

  addTask(title:string){
    const newTask:Task ={
      id:Date.now(),
      title,
      completed:false
    };
    this.tasks.update((tasks)=>[...tasks,newTask]);
  

  }


  deleteTask(index:number){
    this.tasks.update((tasks)=>tasks.filter((task,position)=>position!==index));
  }

  updateTask(title:string){
    this.tasks.update(tasks=>{
      return tasks.map((task)=>{
        if(task.title === title){
          return {...task, completed: !task.completed}
        }
        return task;
      })
    });
  }

  editingTaskMode(index:number,completed:boolean){
    if(!completed){
      this.tasks.update(tasks=>{
        return tasks.map((task,position)=>{
          if(position== index){
            return {...task, editing: true}
          }
          return {...task,editing:false};
        })
      })
    }
  }
  editingTask(index:number,event:Event){
    const input = event.target as HTMLInputElement

    this.tasks.update(tasks=>{
      return tasks.map((task,position)=>{
        if(position== index){
          return {...task, title: input.value, editing:false}
        }
        return task;
      })
    });
  }
}

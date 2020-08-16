import {Exercise} from './exercise.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class TrainingService {
  private availableExercises: Exercise[] = [
    {id: 'jumpingjacks', name: 'Jumping Jacks', duration: 60, calories: 15},
    {id: 'crunches', name: 'Crunches', duration: 60, calories: 23},
    {id: 'squats', name: 'Squats', duration: 40, calories: 32},
    {id: 'pushups', name: 'Pushups', duration: 60, calories: 21},
    {id: 'highknees', name: 'Hign Knees', duration: 40, calories: 12},
    {id: 'burpees', name: 'Burpees', duration: 30, calories: 8},
    {id: 'lunges', name: 'Lunges', duration: 70, calories: 15},
    {id: 'squatjumps', name: 'Squat Jumps', duration: 30, calories: 18},
  ];

  private currentExercise: Exercise;
  public exerciseChanged = new Subject<Exercise>();
  public exercises: Exercise[] = [];

  getExercises() {
    return this.availableExercises.slice();
  }

  getPastExercises() {
    return this.exercises.slice();
  }

  startExercise(selectedId: string) {
    this.currentExercise = this.availableExercises
      .find(el => selectedId === el.id);
    this.exerciseChanged.next(this.currentExercise);
  }

  getCurrentExercise() {
    return {...this.currentExercise};
  }

  cancelExercise(progress: number) {
    this.exercises.push(
      {
        ...this.currentExercise,
        date: new Date(),
        duration: this.currentExercise.duration * (progress / 100),
        calories: this.currentExercise.calories * (progress / 100),
        state: 'cancelled'
      }
    );
    this.currentExercise = null;
    this.exerciseChanged.next(null);
  }

  completeExercise() {
    this.exercises.push({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed'
    });
    this.currentExercise = null;
    this.exerciseChanged.next(null);
  }

}

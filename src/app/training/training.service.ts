import {Exercise} from './exercise.model';
import {Injectable} from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class TrainingService {
  public userUid = null;
  // List
  private availableExercises: Exercise[] = [];
  public exercisesChanged = new Subject<Exercise[]>();
  public finishedExercisesChanged = new Subject<Exercise[]>();
  private fbSub: Subscription[] = [];

  private currentExercise: Exercise;
  public exerciseChanged = new Subject<Exercise>();

  constructor(private firestore: AngularFirestore) {
  }

  // fetch available exercises from firebase
  fetchAvailableExercises() {
    this.fbSub.push(this.firestore
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(map(docArray => {
        return docArray.map(doc => {
          const {name, duration, calories} = doc.payload.doc.data() as Exercise;
          return {id: doc.payload.doc.id, name, duration, calories};
        });
      })).subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      }));
  }

  // fetch finished exercises from firebase
  fetchFinishedExercises() {
    this.fbSub.push(this.firestore.collection('users')
      .doc(`${this.userUid}`)
      .collection('finishedExercises').valueChanges()
      .pipe(map(docArray => {
        return docArray.map((exercise) => {
            // @ts-ignore
            exercise.date = exercise.date.toDate(); // convert firebase date to usual date
            return exercise;
          }
        );
      })).subscribe(
        (exercises: Exercise[]) => this.finishedExercisesChanged.next(exercises)
      ));
  }

  // post to firebase
  private addDataToDatabase(exercise: Exercise) {
    this.firestore.collection('users')
      .doc(`${this.userUid}`)
      .collection('finishedExercises').add(exercise);
  }

  // post as "canceled"
  cancelExercise(progress: number) {
    this.addDataToDatabase(
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

  // post as "completed"
  completeExercise() {
    this.addDataToDatabase({
      ...this.currentExercise,
      date: new Date(),
      state: 'completed'
    });
    this.currentExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelSubscriptions() {
    this.fbSub.forEach(sub => sub.unsubscribe());
  }

  startExercise(selectedId: string) {
    this.currentExercise = this.availableExercises
      .find(el => selectedId === el.id);
    this.exerciseChanged.next(this.currentExercise);
  }

  getCurrentExercise() {
    return {...this.currentExercise};
  }


}

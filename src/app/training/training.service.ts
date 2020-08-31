import {Exercise} from './exercise.model';
import {Injectable} from '@angular/core';
import {Subscription} from 'rxjs';
import {AngularFirestore} from '@angular/fire/firestore';
import {map, take} from 'rxjs/operators';
import {UIService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';

@Injectable({providedIn: 'root'})
export class TrainingService {
  public userUid = null;
  private fbSub: Subscription[] = [];

  constructor(
    private firestore: AngularFirestore,
    private uiService: UIService,
    public store: Store<fromTraining.State>
  ) {
  }

  // fetch available exercises from firebase
  fetchAvailableExercises() {
    this.fbSub.push(
      this.firestore
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(map(docArray => {
          return docArray.map(doc => {
            const {name, duration, calories} = doc.payload.doc.data() as Exercise;
            return {id: doc.payload.doc.id, name, duration, calories};
          });
        })).subscribe((exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetAvailableExercises(exercises));
        },
        error => {
          this.uiService
            .showError('Fetching Exercises failed, please try again', null, 3000);
        }));
  }

  // fetch finished exercises from firebase
  fetchFinishedExercises() {
    this.fbSub.push(
      this.firestore
        .collection('users')
        .doc(`${this.userUid}`)
        .collection('finishedExercises')
        .valueChanges()
        .pipe(map(docArray => {
          return docArray.map((exercise) => {
              // @ts-ignore
              exercise.date = exercise.date.toDate(); // convert firebase date to usual date
              return exercise;
            }
          );
        })).subscribe(
        (exercises: Exercise[]) => {
          this.store.dispatch(new Training.SetFinishedExercises(exercises));
        }
      ))
    ;
  }

  // post to firebase
  private addDataToDatabase(exercise: Exercise) {
    this.firestore.collection('users')
      .doc(`${this.userUid}`)
      .collection('finishedExercises').add(exercise);
  }

  // post as "canceled"
  cancelExercise(progress: number) {
    this.store.select(fromTraining.getCurrentExercise)
      .pipe(take(1)).subscribe((ex: Exercise) => {
      this.addDataToDatabase(
        {
          ...ex,
          date: new Date(),
          duration: ex.duration * (progress / 100),
          calories: ex.calories * (progress / 100),
          state: 'cancelled'
        }
      );
      this.store.dispatch(new Training.StopTraining());
    });
  }

  // post as "completed"
  completeExercise() {
    this.store.select(fromTraining.getCurrentExercise)
      .pipe(take(1))
      .subscribe((ex: Exercise) => {
        this.addDataToDatabase({
          ...ex,
          date: new Date(),
          state: 'completed'
        });
        this.store.dispatch(new Training.StopTraining());
      });
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  cancelSubscriptions() {
    this.fbSub.forEach(sub => sub.unsubscribe());
  }

}

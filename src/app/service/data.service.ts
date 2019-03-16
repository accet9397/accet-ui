import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { tap, map } from 'rxjs/operators';

@Injectable()
export class DataService {
  constructor(private afs: AngularFirestore) {}

  getBatchmates(): Observable<any> {
    const batchmates = [];
    return from(this.afs.collection('batchmates')
      .ref
      .orderBy('firstName')
      .get())
        .pipe(tap((docs) => {
          docs.forEach(doc => {
            batchmates.push(this.processBatchmates(doc));
          });
        }))
        .pipe(map(() => batchmates));
  }

  private processBatchmates(doc: any): any {
    const docData = doc.data();
    return {
      id: doc.id,
      firstName: docData.firstName,
      lastName: docData.lastName,
      dept: docData.dept,
      ...(docData.phone && {phone: docData.phone.primary}),
      ...(docData.email && {email: docData.email.primary})
    };
  }
}

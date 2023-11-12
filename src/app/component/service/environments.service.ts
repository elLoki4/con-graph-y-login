import { Injectable } from '@angular/core';
import {
  addDoc,
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { product } from '../interface/usuario';
import { Observable } from 'rxjs';
//import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentsService {
  constructor(private firestore: Firestore) {}

  addUser(product: product) {
    const userReg = collection(this.firestore, 'crud');
    return addDoc(userReg, product);
  }

  getUser(): Observable<any[]> {
    const userReg = collection(this.firestore, 'crud');
    return collectionData(userReg, { idField: 'id' }) as Observable<any[]>;
  }
  deleteUser(user: product) {
    const docReg = doc(this.firestore, `crud/${user}`);
    return deleteDoc(docReg);
  }
}

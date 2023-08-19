import { Injectable } from '@angular/core';
import {
  addDoc,
  Firestore,
  collection,
  collectionData,
  doc,
} from '@angular/fire/firestore';
import { Usuario } from '../interface/usuario';
import { Observable } from 'rxjs';
//import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentsService {
  constructor(private firestore: Firestore) {}

  addUser(user: Usuario) {
    const userReg = collection(this.firestore, 'crud');
    return addDoc(userReg, user);
  }

  getUser(): Observable<any[]> {
    const userReg = collection(this.firestore, 'crud');
    return collectionData(userReg, { idField: 'id' }) as Observable<any[]>;
  }
  deleteUser(user: Usuario) {
    const docReg = doc(this.firestore, `crud${user.id}`);
  }
}

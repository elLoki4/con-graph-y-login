import { Injectable } from '@angular/core';
import {
  addDoc,
  Firestore,
  collection,
  collectionData,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
} from '@angular/fire/firestore';
import { prodcutUpdate, product } from '../interface/usuario';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { collectionData } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class EnvironmentsService {
  constructor(private firestore: Firestore,private auth:AngularFireAuth) {}

  addProduct(product: product) {
    const userReg = collection(this.firestore, 'crud');
    return addDoc(userReg, product);
  }

  getProduct(): Observable<any[]> {
    const userReg = collection(this.firestore, 'crud');
    return collectionData(userReg, { idField: 'id' }) as Observable<any[]>;
  }
  deleteProduct(user: product) {
    const docReg = doc(this.firestore, `crud/${user}`);
    return deleteDoc(docReg);
  }

  updateProduct(user: any) {
    const docReg = doc(this.firestore, `crud/${user}`);

    return updateDoc(docReg, user);
  }
  token(){
    this.auth.idTokenResult
  }

}

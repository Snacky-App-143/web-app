import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from '@firebase/firestore';
import { db } from 'src/boot/firebase';
import { Product } from 'src/models/product.model';
import {
  FirestoreSnackyUser,
  RegisterSnackyUserBody,
} from 'src/models/user.model';
import { Collections } from 'src/types/firestore/Collections';
import useApiServices from './useApiServices';
import useUtility from './useUtility';

export default function () {
  const { showError } = useUtility();
  const { createNewUserApi, deleteUserApi } = useApiServices();

  async function signInWithEmailAndPassword(email: string, password: string) {
    if (!import.meta.env.SSR) {
      const { firebaseAuth } = await import('src/boot/firebase-auth');
      const { signInWithEmailAndPassword: signIn } = await import(
        '@firebase/auth'
      );

      return signIn(firebaseAuth, email, password).catch(showError);
    }

    return null;
  }

  async function signOut() {
    if (!import.meta.env.SSR) {
      const { firebaseAuth } = await import('src/boot/firebase-auth');
      const { signOut: firebaseSignOut } = await import('@firebase/auth');

      return firebaseSignOut(firebaseAuth);
    }
  }

  async function createNewUser(data: RegisterSnackyUserBody) {
    try {
      const response = await createNewUserApi(data);

      if (response.status === 200) {
        return response.data;
      }

      return null;
    } catch (error) {
      showError(error);
      return null;
    }
  }

  async function deleteUser(uid: string) {
    try {
      const response = await deleteUserApi(uid);

      if (response.status === 200) {
        return true;
      }

      return false;
    } catch (error) {
      showError(error);
      return false;
    }
  }

  async function getUserList() {
    try {
      const userCollection = collection(db, Collections.USERS);
      return (await getDocs(query(userCollection))).docs.map(
        (doc) => doc.data() as FirestoreSnackyUser
      );
    } catch (error) {
      showError(error);
    }
  }

  async function updateUserInfo(data: FirestoreSnackyUser) {
    try {
      const userCollection = doc(db, `${Collections.USERS}/${data.id}`);
      await updateDoc(userCollection, { ...data });
      return data;
    } catch (error) {
      showError(error);
    }
  }

  const createNewProduct = async (data: Product) => {
    try {
      const productCollection = collection(db, Collections.PRODUCTS);
      const productRef = await addDoc(productCollection, data);

      return {
        id: productRef.id,
        ...data,
      };
    } catch (error) {
      showError(error);
      return null;
    }
  };

  const updateProduct = async (id: string, data: Partial<Product>) => {
    try {
      const productDoc = doc(db, `${Collections.PRODUCTS}/${id}`);
      await updateDoc(productDoc, data);

      return {
        id,
        ...(await getDoc(productDoc)).data(),
      };
    } catch (error) {
      showError(error);
      return null;
    }
  };

  return {
    signInWithEmailAndPassword,
    signOut,
    createNewUser,
    getUserList,
    updateUserInfo,
    deleteUser,
    createNewProduct,
    updateProduct,
  };
}

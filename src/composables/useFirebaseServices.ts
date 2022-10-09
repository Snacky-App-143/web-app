import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from '@firebase/firestore';
import {
  FirebaseStorage,
  listAll,
  ref,
  StorageReference,
  uploadBytes,
  uploadBytesResumable,
  uploadString,
} from '@firebase/storage';
import { db } from 'src/boot/firebase';
import { firebaseStorage } from 'src/boot/firebase-storage';
import { FirestoreProduct, Product } from 'src/models/product.model';
import {
  FirestoreSnackyUser,
  RegisterSnackyUserBody,
} from 'src/models/user.model';
import { StorageFolder } from 'src/types/firebase-storage/storage';
import { Collections } from 'src/types/firestore/Collections';
import useApiServices from './useApiServices';
import useUtility from './useUtility';

export default function () {
  const { showError } = useUtility();
  const { createNewUserApi, deleteUserApi } = useApiServices();
  const storageRef = ref(firebaseStorage, StorageFolder.base);

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

  async function getProductList() {
    try {
      const productCollection = collection(db, Collections.PRODUCTS);
      return (await getDocs(query(productCollection))).docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as FirestoreProduct)
      );
    } catch (error) {
      showError(error);
      return null;
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

  // Upload a file to storage
  function uploadFile(
    item: File | Uint8Array | Blob | string,
    path: string,
    storage?: StorageReference
  ) {
    try {
      const fileRef = ref(storage || storageRef, path);

      if (typeof item === 'string') {
        return uploadString(fileRef, item);
      } else {
        return uploadBytes(fileRef, item);
      }
    } catch (error) {
      showError(error);
      return null;
    }
  }

  // Upload a resumable file
  function uploadResumableFile(
    item: File | Uint8Array | Blob,
    path: string,
    storage?: StorageReference
  ) {
    try {
      const fileRef = ref(storage || storageRef, path);
      return uploadBytesResumable(fileRef, item);
    } catch (error) {
      showError(error);
      return null;
    }
  }

  // Get storage files
  function getStorageFiles(storage?: StorageReference) {
    return listAll(storage || storageRef);
  }

  function getStorageRef(path: string) {
    return ref(firebaseStorage, path);
  }

  return {
    storageRef,

    signInWithEmailAndPassword,
    signOut,
    createNewUser,
    getUserList,
    updateUserInfo,
    deleteUser,
    createNewProduct,
    updateProduct,
    getProductList,
    uploadFile,
    uploadResumableFile,
    getStorageFiles,
    getStorageRef,
  };
}

import { api } from 'src/boot/axios';
import {
  FirestoreSnackyUser,
  RegisterSnackyUserBody,
} from 'src/models/user.model';

export default function () {
  function createNewUserApi(data: RegisterSnackyUserBody) {
    return api.post<FirestoreSnackyUser>('/users', data);
  }

  function deleteUserApi(uid: string) {
    return api.delete<null>(`/users/${uid}`);
  }

  return {
    createNewUserApi,
    deleteUserApi,
  };
}

export type VitubeUser = {
  firstName: string;
  lastName: string;
  isInfoPublic: boolean;
};

export interface FirestoreVitubeUser extends VitubeUser {
  id: string;
}

export interface FirestoreVitubeUserWithPublicInfo extends FirestoreVitubeUser {
  info: {
    phone: string;
    email: string;
  };
}

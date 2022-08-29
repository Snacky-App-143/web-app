export enum UserRoles {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  MANAGER = 'manager',
  OWNER = 'owner',
}

export enum UserGenders {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

export type SnackyUser = {
  firstName: string;
  lastName: string;
  role: UserRoles;
  dob: string;
  gender: UserGenders;
  passportId: string;
  phoneNumber: string;
  email: string;
};

export interface FirestoreSnackyUser extends SnackyUser {
  id: string;
}

export interface RegisterSnackyUserBody extends FirestoreSnackyUser {
  password: string;
}

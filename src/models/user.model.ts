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
};

export interface FirestoreSnackyUser extends SnackyUser {
  id: string;
}

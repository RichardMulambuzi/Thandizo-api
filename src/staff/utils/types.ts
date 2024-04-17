export interface CreateUserParams {
  fullName: string;
  username: string;
  phoneNumber: string;
  district: string;
  area: string;
  password: string;
  roles: string[];
}

export interface UpdateUserParams {
  fullName?: string;
  username?: string;
  phoneNumber?: string;
  district?: string;
  area?: string;
  password?: string;
  roles?: string[];
}

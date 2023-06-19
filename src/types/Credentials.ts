export interface SignupCredentials {
  username: string;
  password: string;
}

export interface SignupErrors {
  username?: string;
  password?: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginErrors {
  username?: string;
  password?: string;
}

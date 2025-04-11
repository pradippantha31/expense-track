
export interface AuthUser {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  role?: 'admin' | 'member';
}

export interface SignUpFormData {
  email: string;
  password: string;
  name: string;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface ResetPasswordFormData {
  email: string;
}

export interface UpdateProfileFormData {
  name?: string;
  email?: string;
  avatar?: File;
}

export interface UpdatePasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

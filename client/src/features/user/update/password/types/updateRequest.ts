export interface UpdatePasswordRequest {
  isOTPValidated: boolean;
  currentPassword: string;
  newPassword: string;
}

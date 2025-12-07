export const UserStatus = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive',
  DELETED: 'Deleted',
} as const;

export type UserStatus = (typeof UserStatus)[keyof typeof UserStatus];

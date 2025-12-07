export const UserTitle = {
  MR: 'Mr',
  MRS: 'Mrs',
  MS: 'Ms',
  MX: 'Mx',
  DR: 'Dr',
  PROF: 'Prof',
} as const;

export type UserTitle = (typeof UserTitle)[keyof typeof UserTitle];

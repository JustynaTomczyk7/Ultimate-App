export type User = {
  id: number;
  email: string;
  roles: string[];
  is_blocked: boolean;
  is_activated: boolean;
  name: string;
  surname: string;
  birth_date: string;
  phone_prefix: string;
  phone_number: number;
  marketing: boolean;
  selling: boolean;
  privacy: boolean;
};

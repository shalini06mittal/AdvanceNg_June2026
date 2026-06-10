// models/user-profile.model.ts
export interface Address {
  street:  string;
  city:    string;
  state:   string;
  zipCode: string;
}
export interface UserProfile {
  firstName:   string;
  lastName:    string;
  email:       string;
  phoneNumber: string;
  address:     Address;
  skills:      string[];
}
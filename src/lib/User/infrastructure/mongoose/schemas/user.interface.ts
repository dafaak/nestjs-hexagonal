export interface UserInterface extends Document {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

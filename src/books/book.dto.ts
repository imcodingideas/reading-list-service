import { Status } from '../graphql';

export class BookDto {
  title: string;
  author: string;
  status?: Status;
  rating?: number;
  notes?: string;
}

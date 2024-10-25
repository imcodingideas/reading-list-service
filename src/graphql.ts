
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export enum Status {
    NOT_STARTED = "NOT_STARTED",
    IN_PROGRESS = "IN_PROGRESS",
    COMPLETED = "COMPLETED"
}

export class CreateBookInput {
    title: string;
    author: string;
    status?: Nullable<Status>;
    rating?: Nullable<number>;
    notes?: Nullable<string>;
}

export class UpdateBookInput {
    id: string;
    title?: Nullable<string>;
    author?: Nullable<string>;
    status?: Nullable<Status>;
    rating?: Nullable<number>;
    notes?: Nullable<string>;
}

export class DeleteBookInput {
    id: string;
}

export class GetBookInput {
    id: string;
}

export class Book {
    id: string;
    title: string;
    author: string;
    status: Status;
    rating?: Nullable<number>;
    notes?: Nullable<string>;
}

export abstract class IQuery {
    abstract getBook(input: GetBookInput): Nullable<Book> | Promise<Nullable<Book>>;

    abstract listBooks(): Nullable<Book[]> | Promise<Nullable<Book[]>>;
}

export abstract class IMutation {
    abstract createBook(input: CreateBookInput): Nullable<Book> | Promise<Nullable<Book>>;

    abstract updateBook(input: UpdateBookInput): Nullable<Book> | Promise<Nullable<Book>>;

    abstract deleteBook(input: DeleteBookInput): Nullable<boolean> | Promise<Nullable<boolean>>;
}

type Nullable<T> = T | null;

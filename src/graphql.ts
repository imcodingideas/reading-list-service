
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class Book {
    name: string;
}

export abstract class IQuery {
    abstract getBooks(): Book[] | Promise<Book[]>;
}

type Nullable<T> = T | null;

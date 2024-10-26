
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

export enum BOOK_SEARCH_SORT_COLUMN {
    TITLE = "TITLE",
    AUTHOR = "AUTHOR",
    STATUS = "STATUS",
    RATING = "RATING"
}

export enum BOOK_SEARCH_SORT_ORDER {
    ASC = "ASC",
    DESC = "DESC"
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

export class GetBookByIdInput {
    id: string;
}

export class BooksSearchSort {
    column: BOOK_SEARCH_SORT_COLUMN;
    order: BOOK_SEARCH_SORT_ORDER;
}

export class BooksSearchFilter {
    title?: Nullable<string>;
    author?: Nullable<string>;
    status?: Nullable<Status>;
    rating?: Nullable<number>;
}

export class Book {
    id: string;
    title: string;
    author: string;
    status: Status;
    rating?: Nullable<number>;
    notes?: Nullable<string>;
}

export class OffsetPageInfo {
    totalResults: number;
    limit: number;
    offset: number;
    nextOffset?: Nullable<number>;
    previousOffset?: Nullable<number>;
}

export class AllBooksConnection {
    node: Book[];
    offsetPageInfo: OffsetPageInfo;
}

export class BookSearchResultConnection {
    node: Book[];
    offsetPageInfo: OffsetPageInfo;
}

export abstract class IQuery {
    abstract books(limit?: Nullable<number>, offset?: Nullable<number>): AllBooksConnection | Promise<AllBooksConnection>;

    abstract getBookById(input: GetBookByIdInput): Nullable<Book> | Promise<Nullable<Book>>;

    abstract bookSearch(limit?: Nullable<number>, offset?: Nullable<number>, sort?: Nullable<BooksSearchSort>, filter?: Nullable<BooksSearchFilter>): BookSearchResultConnection | Promise<BookSearchResultConnection>;
}

export abstract class IMutation {
    abstract createBook(input: CreateBookInput): Nullable<Book> | Promise<Nullable<Book>>;

    abstract updateBook(input: UpdateBookInput): Nullable<Book> | Promise<Nullable<Book>>;

    abstract deleteBook(input: DeleteBookInput): Nullable<boolean> | Promise<Nullable<boolean>>;
}

type Nullable<T> = T | null;

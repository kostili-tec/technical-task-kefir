export interface ResponseCommentData {
    id: number;
    created: string | Date;
    text: string;
    author: number;
    parent: null | number;
    likes: number;
}

export interface ResponseAuthor {
    id: number;
    name: string;
    avatar: string;
}

export interface ResponseCommentPagination {
    page: number;
    size: number;
    total_pages: number;
}

export type ResponseComments = {
    data: ResponseCommentData[];
    pagination: ResponseCommentPagination;
};

export interface ModifiedComment extends ResponseCommentData {
    depth: number;
    replies: [] | ModifiedComment[];
}

export enum ApiUrls {
    AUTHORS = "/api/authors",
    COMMENTS = "/api/comments",
}

export enum LoadingState {
    PENDING = "pending",
    DONE = "done",
    ERROR = "error",
}

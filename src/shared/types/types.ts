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

interface ResponseCommentPagination {
    page: number;
    size: number;
    total_pages: number;
}

export type ResponseComment = {
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

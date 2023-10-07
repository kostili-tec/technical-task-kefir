import {makeAutoObservable, runInAction} from "mobx";
import {
    ResponseAuthor,
    ResponseCommentData,
    ResponseCommentPagination,
    ResponseComments,
    LoadingState,
} from "../shared/types/types";
import {sortCommentsByParent} from "../shared/utils/sortComments";
import getAuthorsRequest from "../api/authors/getAuthorsRequest";
import fetchCommentsWithRetry from "../shared/utils/fetchCommentsWithRetry";

class CommentsStore {
    comments: ResponseCommentData[] = [];
    pagination: ResponseCommentPagination = {page: 1, size: 1, total_pages: 1};
    authors: ResponseAuthor[] = [];
    total = {
        totalComments: 0,
        totalLikes: 0,
    };
    stateData: LoadingState = LoadingState.PENDING;

    constructor() {
        makeAutoObservable(this);
    }

    async loadComments(pageNumber: number = 1) {
        this.stateData = LoadingState.PENDING;
        try {
            const commentsReposonse: ResponseComments =
                await fetchCommentsWithRetry(pageNumber);
            const authorsResponse = await getAuthorsRequest();
            const sortedComments = sortCommentsByParent(commentsReposonse.data);
            runInAction(() => {
                this.comments = sortedComments;
                this.authors = authorsResponse;
                this.pagination = commentsReposonse.pagination;
                this.total.totalComments = this.comments.length;
                this.calculateLikes();
                this.stateData = LoadingState.DONE;
            });
        } catch (e) {
            runInAction(() => {
                this.stateData = LoadingState.ERROR;
                console.error(e);
            });
        }
    }

    async handleLoadComments() {
        const currentPageNumber = this.pagination.page;
        const nextPageNumber = currentPageNumber + 1;
        const totalPages = this.pagination.total_pages;
        if (nextPageNumber <= totalPages) {
            this.stateData = LoadingState.PENDING;
            try {
                const commentsReposonse: ResponseComments =
                    await fetchCommentsWithRetry(nextPageNumber);
                const {data, pagination} = commentsReposonse;
                const sortedComments = sortCommentsByParent(data);
                runInAction(() => {
                    this.comments.push(...sortedComments);
                    this.pagination = pagination;
                    this.total.totalComments = this.comments.length;
                    this.calculateLikes();
                    this.stateData = LoadingState.DONE;
                });
            } catch (e) {
                runInAction(() => {
                    this.stateData = LoadingState.ERROR;
                    console.error(e);
                });
            }
        } else {
            this.stateData = LoadingState.DONE;
        }
    }

    likeComment(commentId: number) {
        const commentIndex = this.comments.findIndex(
            (comment) => comment.id === commentId,
        );
        if (commentIndex !== -1) {
            this.comments[commentIndex].likes += 1;
            this.calculateLikes();
            return true;
        }
        return false;
    }

    unlikeComment(commentId: number) {
        const commentIndex = this.comments.findIndex(
            (comment) => comment.id === commentId,
        );
        if (commentIndex !== -1) {
            this.comments[commentIndex].likes -= 1;
            this.calculateLikes();
            return true;
        }
        return false;
    }

    getAuthor(id: number) {
        return this.authors.find((author) => author.id === id);
    }

    calculateLikes() {
        this.total.totalLikes = this.comments.reduce(
            (total, comment) => total + comment.likes,
            0,
        );
    }
}

const commentsStore = new CommentsStore();

export default commentsStore;

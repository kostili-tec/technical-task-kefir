import {ResponseCommentData, ModifiedComment} from "../types/types";

const createCommentTree = (
    comments: ResponseCommentData[],
    parentId: null | number = null,
    depth = 0,
): ModifiedComment[] => {
    return comments
        .filter((comment) => comment.parent === parentId)
        .map((comment) => ({
            ...comment,
            depth,
            replies: createCommentTree(comments, comment.id, depth + 1),
        }));
};

export default createCommentTree;

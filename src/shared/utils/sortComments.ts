import {ResponseCommentData} from "../types/types";

export function sortCommentsByParent(comments: ResponseCommentData[]) {
    const sortedData = [];

    function findChildren(parentId: number) {
        const children = comments.filter((item) => item.parent === parentId);
        for (const child of children) {
            sortedData.push(child);
            findChildren(child.id);
        }
    }

    const topLevelItems = comments.filter((item) => item.parent === null);
    for (const item of topLevelItems) {
        sortedData.push(item);
        findChildren(item.id);
    }

    return sortedData;
}

export function sortByDate(comments: ResponseCommentData[]) {
    return comments.slice().sort((a, b) => {
        const dateA = new Date(a.created);
        const dateB = new Date(b.created);
        return +dateB - +dateA;
    });
}

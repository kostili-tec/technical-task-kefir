import getCommentsRequest from "src/api/comments/getCommentsRequest";
import {ResponseComments} from "../types/types";

async function fetchCommentsWithRetry(page: number, maxRetries: number = 3) {
    let retries = 0;

    async function fetch(page: number): Promise<ResponseComments> {
        try {
            const fetchedData = (await getCommentsRequest(
                page,
            )) as ResponseComments;
            return fetchedData;
        } catch (error) {
            console.error("Error during data request. Try again...", error);

            if (retries <= maxRetries) {
                retries++;
                return fetch(page);
            } else {
                throw new Error("The maximum number of attempts reached.");
            }
        }
    }
    return fetch(page);
}

export default fetchCommentsWithRetry;

import {request} from '../../util/APIUtils'
import {API_BASE_URL} from '../../constants/constants';

export function addComment(newCommentReq) {
    const options = {
        url: API_BASE_URL + '/api/v1/comments/create',
        method: 'POST',
        body: JSON.stringify(newCommentReq)
    };
    return request(options);
}

export function dropComment(id) {
    const options = {
        url: API_BASE_URL + '/api/v1/comments/' + id,
        method: 'DELETE',
    };
    return request(options);
}
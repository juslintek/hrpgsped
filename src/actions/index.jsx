import axios from 'axios';

export const FETCH_POSTS = 'FETCH_POSTS';
export const FETCH_POST = 'FETCH_POST';

export function fetchPosts(post_type = 'posts') {
    return function (dispatch) {
        axios.get(`https://hosting.review/wp-json/wp/v2/${post_type}`)
            .then(response => {
                dispatch({
                    type: FETCH_POSTS,
                    payload: response.data
                });
            });
    }
}

export function fetchPost(post_type, postSlug) {
    return function (dispatch) {
        axios.get(`https://hosting.review/wp-json/wp/v2/${post_type}?slug=${postSlug}`)
            .then(response => {
                dispatch({
                    type: FETCH_POST,
                    payload: response.data
                });
            });
    }
}

export * from './webPageTest';

import _ from "lodash";
import jsonPlaceholder from "../apis/jsonPlaceholder";

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
  await dispatch(fetchPosts());

  // Use Lodash map to get userId field, then Lodash uniq to get unique values
  // const userIds = _.uniq(_.map(getState().posts, "userId"));
  // userIds.forEach(id => dispatch(fetchUser(id)));

  _.chain(getState().posts)
    .map("userId")
    .uniq()
    .forEach(id => dispatch(fetchUser(id)))
    .value();
};

export const fetchPosts = () => async dispatch => {
  const response = await jsonPlaceholder.get("/posts");

  dispatch({ type: "FETCH_POSTS", payload: response.data });
};

export const fetchUser = id => async dispatch => {
  const response = await jsonPlaceholder.get(`/users/${id}`);

  dispatch({ type: "FETCH_USER", payload: response.data });
};

// // Create a separate private function so it can be memoized
// const _fetchUser = _.memoize(async (id, dispatch) => {
//     const response = await jsonPlaceholder.get(`/users/${id}`);

//     dispatch({ type: "FETCH_USER", payload: response.data });
//   });

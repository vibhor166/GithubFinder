import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  SET_ALERT,
  SET_LOADING,
  GET_REPOS,
  GET_USER,
  CLEAR_USERS
} from '../types';

let githubClientId;
let githubClientSecret;
if (process.env.NODE_ENV !== 'production') {
}

const GithubState = props => {
  //global state for anything that has to do with github
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Search users
  const searchUsers = async text => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };

  //Get user
  const getUser = async username => {
    const res = await axios.get(
      `https://api.github.com/users/${username}?&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({ type: GET_USER, payload: res.data });
  };

  //Get repos
  const getUserRepos = async username => {
    setLoading();

    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  //Clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //Set loading
  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      //this provider takes in one prop of value, and we pass in anything which we want to be available to the entire app
      //the props.children will contain all the methods created inside this js file which will then be available to the entire app, when we wrap the provider around all the components in app.js which require access to methods

      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};
export default GithubState;

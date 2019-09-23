import {
  GET_CONTACTS,
  ADD_CONTACT,
  DELETE_CONTACT,
  GET_CONTACT,
  UPDATE_CONTACT
} from "../actions/types";
import Axios from "axios";

export const getContacts = () => async dispatch => {
  const res = await Axios.get("https://jsonplaceholder.typicode.com/users");
  dispatch({
    type: GET_CONTACTS,
    payload: res.data
  });
};
export const getContact = id => async dispatch => {
  const res = await Axios.get(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  dispatch({
    type: GET_CONTACT,
    payload: res.data
  });
};

export const deleteContact = id => async dispatch => {
  await Axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);

  dispatch({
    type: DELETE_CONTACT,
    payload: id
  });
};

export const addContact = contact => async dispatch => {
  await Axios.post("https://jsonplaceholder.typicode.com/users", contact);

  dispatch({
    type: ADD_CONTACT,
    payload: contact
  });
};

export const updateContact = contact => async dispatch => {
  console.log("TESTIII");

  const res = await Axios.put(
    `https://jsonplaceholder.typicode.com/users/${contact.id}`,
    contact
  );
  console.log("Test");

  dispatch({
    type: UPDATE_CONTACT,
    payload: res.data
  });
};

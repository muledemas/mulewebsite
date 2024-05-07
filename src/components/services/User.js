import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants/ApiConstants';

//const url = "http://localhost:5000/users";

export const getUsers=async ()=>{
  return await axios.get(BASE_URL);
}

export const addUser = async (user)=>{
    return await axios.post(BASE_URL, user);
}

export const editUser=async (user,id)=>{
    return await axios.put(`${BASE_URL}/${id}`,user); 
}
export const deleteUser=async (id)=>{
    return await axios.delete(`${BASE_URL}/${id}`)
}
import React from "react";
import axios from "axios";
  

export const deleteElement = async (data) => {
  console.log(data)
  try {
    await axios.post('http://nas/delete-element.php', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  } catch (error) {
    console.error(error)
  }
};
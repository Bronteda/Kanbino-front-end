import axios from "axios";
const BASEURL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;

//response from axios already in json
const signUp = async (formData) => {
  try {
    const response = await axios.post(`${BASEURL}/sign-up`, formData);
    console.log("sign-up response", response);

    if (response.error) {
      throw new Error(response.data.error);
    }

    if (response.data.token) {
      //if it has a token put it into local storage
      localStorage.setItem("token", response.data.token);
      return JSON.parse(atob(response.data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (error) {
    throw new Error(error);
  }
};

const signIn = async (formData) => {
  try {
    const response = await axios.post(`${BASEURL}/sign-in`, formData);
    console.log("sign-up response", response);

    if (response.error) {
      throw new Error(response.data.error);
    }

    if (response.data.token) {
      //if it has a token put it into local storage
      localStorage.setItem("token", response.data.token);
      return JSON.parse(atob(response.data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (error) {
    throw new Error(error);
  }
};


export {signIn, signUp};
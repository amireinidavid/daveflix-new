import Axios from "./Axios";

// ************* PUBLIC APIS **************

// register new user API call

const registerService = async (user) => {
  const { data } = await Axios.post("/users", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// logout user function
const logoutService = () => {
  localStorage.removeItem("userInfo");
  return null;
};

// login user api call

const loginServices = async (user) => {
  const { data } = await Axios.post("/users/login", user);
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// update profile call

const updateProfileService = async (user, token) => {
  const { data } = await Axios.put("/users", user, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }
  return data;
};

// delete profile API call

const deleteProfileService = async (token) => {
  const { data } = await Axios.delete("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (data) {
    localStorage.removeItem("userInfo");
  }
  return data;
};

//  change password API call\
const changePasswordService = async (passwords, token) => {
  const { data } = await Axios.put("/users/password", passwords, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// get all favotite movies
const getFavoriteMovies = async (token) => {
  const { data } = await Axios.get("/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// dlete all favorite movies

const deleteFavoriteMovies = async (token) => {
  const { data } = await Axios.delete("/users/favorites", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// like movie api call

const likedMovieService = async (movieId, token) => {
  const { data } = await Axios.post(`/users/favorites`, movieId, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

//  *************** ADMIN  APIs **********

// admin get all users
const getAllUserService = async (token) => {
  const { data } = await Axios.get("/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// admin delete user
const deleteUserService = async (id, token) => {
  const { data } = await Axios.delete(`/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export {
  registerService,
  logoutService,
  updateProfileService,
  loginServices,
  deleteProfileService,
  changePasswordService,
  getFavoriteMovies,
  deleteFavoriteMovies,
  getAllUserService,
  deleteUserService,
  likedMovieService,
};

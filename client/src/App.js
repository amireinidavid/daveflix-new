import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import AboutUs from "./Screens/AboutUs";
import NotFound from "./Screens/NotFound";
import ContactUs from "./Screens/ContactUs";
import MoviesPage from "./Screens/Movies";
import SingleMovie from "./Screens/SingleMovie";
import Watchpage from "./Screens/Watchpage";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Profile from "./Screens/Dashboard/Profile";
import Aos from "aos";
import Password from "./Screens/Dashboard/Password";
import FavouriteMovies from "./Screens/Dashboard/FavouriteMovies";
import Dashboard from "./Screens/Dashboard/Admin/Dashboard";
import Movielist from "./Screens/Dashboard/Admin/Movielist";
import Categories from "./Screens/Dashboard/Admin/Categories";
import Addmovies from "./Screens/Dashboard/Admin/Addmovies";
import Users from "./Screens/Dashboard/Admin/Users";
import ScrollOnTop from "./ScrollOnTop";
import DrawerContext from "./Context/DrawerContext";
import AnimationCat from "./components/CategoriesSwitch/AnimationCat";
import Actioncategory from "./components/CategoriesSwitch/Actioncategory";
import Dramacategory from "./components/CategoriesSwitch/Dramacategory";
import ToastContainer from "./components/Notification/ToastContainer";
import { AdminProtectionRouter, ProtectedRouter } from "./ProtectedRouter";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoriesAction } from "./Redux/Actions/CategoriesAction";
import { getAllMoviesAction } from "./Redux/Actions/MoviesAction";
import { getFavoriteMoviesAction } from "./Redux/Actions/userActions";
import toast from "react-hot-toast";
import EditMovie from "./Screens/Dashboard/Admin/EditMovie";

function App() {
  Aos.init();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const { isError, isSuccess } = useSelector((state) => state.userLikeMovie);
  const { isError: catError } = useSelector((state) => state.categoryGetAll);

  useEffect(() => {
    dispatch(getAllCategoriesAction());
    dispatch(getAllMoviesAction({}));
    if (userInfo) {
      dispatch(getFavoriteMoviesAction());
    }
    if (isError || catError) {
      toast.error(isError || catError);
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "LIKE_MOVIE_RESET" });
    }
  }, [dispatch, userInfo, isError, catError, isSuccess]);
  return (
    <>
      <ToastContainer />
      <DrawerContext>
        <ScrollOnTop>
          <Routes>
            {/* ************ PUBLIC ROUTES *********  */}
            <Route path="/" element={<HomeScreen />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:search" element={<MoviesPage />} />
            <Route path="/movie/:id" element={<SingleMovie />} />
            <Route path="/watch/:id" element={<Watchpage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/anime" element={<AnimationCat />} />
            <Route path="/action" element={<Actioncategory />} />
            <Route path="/drama" element={<Dramacategory />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
            {/* ****************** PRIVATE PUBLIC ROUTES ****************** */}
            <Route element={<ProtectedRouter />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/password" element={<Password />} />
              <Route path="/favourite" element={<FavouriteMovies />} />
              {/* *************** ADMIN ROUTES ******************* */}
              <Route element={<AdminProtectionRouter />}>
                <Route path="/movielist" element={<Movielist />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/users" element={<Users />} />
                <Route path="/addmovie" element={<Addmovies />} />
                <Route path="/edit/:id" element={<EditMovie />} />
              </Route>
            </Route>
          </Routes>
        </ScrollOnTop>
      </DrawerContext>
    </>
  );
}

export default App;

import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import { FaRegListAlt, FaUser } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import Table from "../../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAction } from "../../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../../components/Notification/Loader";
import { Empty } from "../../../components/Notification/Empty";
import { deleteMovieAction } from "../../../Redux/Actions/MoviesAction";

function Dashboard() {
  const dispatch = useDispatch();
  // use selectors
  const {
    isLoading: catLoading,
    isError: catError,
    categories,
  } = useSelector((state) => state.categoryGetAll);
  const {
    isLoading: userLoading,
    isError: userError,
    users,
  } = useSelector((state) => state.adminGetAllUser);

  const { isLoading, isError, movies, totalMovies } = useSelector(
    (state) => state.getAllMovies
  );

  // delete
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMovie
  );

  // delete movie handler
  const deleteMoviehandler = (id) => {
    window.confirm("Are u sure you want to delete this movie") &&
      dispatch(deleteMovieAction(id));
  };

  useEffect(() => {
    // get all users
    dispatch(getAllUsersAction());

    // errors
    if (isError || catError || userError || deleteError) {
      toast.error("Something went wrong");
    }
  }, [dispatch, isError, catError, userError, deleteError]);

  // dashboard data
  const DashboardData = [
    {
      bg: "bg-orange-600",
      icon: FaRegListAlt,
      title: "Total Movies",
      total: isLoading ? "Loading..." : totalMovies || 0,
    },
    {
      bg: "bg-blue-700",
      icon: HiViewGridAdd,
      title: "Total Categories",
      total: catLoading ? "loading..." : categories?.length || 0,
    },
    {
      bg: "bg-green-600",
      icon: FaUser,
      title: "Total User",
      total: userLoading ? "Loading..." : users?.length || 0,
    },
  ];
  return (
    <Sidebar>
      <h2 className="text-xl font-bold">Dashboard</h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {DashboardData.map((data, index) => (
          <div
            className="p-4 rounded bg-main border-border grid grid-cols-4 gap-4"
            key={index}
          >
            <div
              className={`col-span-1 rounded-full h-12 w-12 flex-colo ${data.bg}`}
            >
              <data.icon />
            </div>
            <div className="col-span-3">
              <h2>{data.title}</h2>
              <p className="text-text mt-2 font-bold ">{data.total}</p>
            </div>
          </div>
        ))}
      </div>
      <h3 className="text-md font-medium italic my-6">Recent Movies</h3>
      {isLoading || deleteLoading ? (
        <Loader />
      ) : movies?.length > 0 ? (
        <Table
          data={movies?.slice(0, 5)}
          admin={true}
          onDeleteHandler={deleteMoviehandler}
        />
      ) : (
        <Empty message="Empty" />
      )}
    </Sidebar>
  );
}

export default Dashboard;

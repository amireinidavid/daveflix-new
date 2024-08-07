import React, { useEffect } from "react";
import Sidebar from "../Sidebar";
import Table2 from "../../../components/Table2";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteUserAction,
  getAllUsersAction,
} from "../../../Redux/Actions/userActions";
import Loader from "../../../components/Notification/Loader";
import { Empty } from "../../../components/Notification/Empty";

function Users() {
  const dispatch = useDispatch();

  const { isLoading, isError, users } = useSelector(
    (state) => state.adminGetAllUser
  );

  // delete

  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSucess,
  } = useSelector((state) => state.adminDeleteUser);

  // delete movies handler
  const deleteMoviesHandler = (id) => {
    if (window.confirm("Are you sure u want to delete this user")) {
      dispatch(deleteUserAction(id));
    }
  };

  // use Effect
  useEffect(() => {
    dispatch(getAllUsersAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError ? "GET_ALL_USERS_RESET" : "DELETE_USER_RESET",
      });
    }
  }, [dispatch, isError, deleteError]);
  return (
    <Sidebar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Users</h2>
        </div>
        {isLoading ? (
          <Loader />
        ) : users?.length > 0 ? (
          <Table2
            data={users}
            users={true}
            onDeleteFunction={deleteMoviesHandler}
          />
        ) : (
          <Empty message="you dont have any user" />
        )}
      </div>
    </Sidebar>
  );
}

export default Users;

import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { HiPlusCircle } from "react-icons/hi";
import Table2 from "../../../components/Table2";
import CategoryModal from "../../../components/Modals/CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryAction } from "../../../Redux/Actions/CategoriesAction";
import Loader from "../../../components/Notification/Loader";
import { Empty } from "../../../components/Notification/Empty";
import toast from "react-hot-toast";

function Categories() {
  const [modalOpen, setModalOpen] = useState(false);
  const [category, setCategory] = useState();
  const dispatch = useDispatch();

  // all categories

  const { categories, isLoading } = useSelector(
    (state) => state.categoryGetAll
  );

  // delete category
  const { isSuccess, isError } = useSelector((state) => state.categoryDelete);
  const adminDeletecategory = (id) => {
    if (window.confirm("Are you sure you want to delete this category")) {
      dispatch(deleteCategoryAction(id));
    }
  };

  const OnEditFunction = (id) => {
    setCategory(id);
    setModalOpen(!modalOpen);
  };

  useEffect(() => {
    if (isError) {
      toast.error(isError);
      dispatch({ type: "DELETE_CATEGORY_RESET" });
    }
    if (isSuccess) {
      dispatch({ type: "DELETE_CATEGORY_RESET" });
    }

    if (modalOpen === false) {
      setCategory();
    }
  }, [modalOpen, dispatch, isError, isSuccess]);
  return (
    <Sidebar>
      <CategoryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        category={category}
      />
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Categories</h2>
          <button
            onClick={() => setModalOpen(true)}
            className="bg-subMain font-medium trnasitions hover:bg-main flex-rows gap-4 border border-subMain text-white py-2 px-4 rounded "
          >
            <HiPlusCircle /> Create
          </button>
        </div>
        {isLoading ? (
          <Loader />
        ) : categories?.length > 0 ? (
          <Table2
            data={categories}
            users={false}
            OnEditFunction={OnEditFunction}
            onDeleteFunction={adminDeletecategory}
          />
        ) : (
          <Empty message="you have no category" />
        )}
      </div>
    </Sidebar>
  );
}

export default Categories;

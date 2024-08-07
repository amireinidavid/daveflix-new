import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Uploader from "../../components/Uploader";
import { Input } from "../../components/UsedInputs";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers/yup";
import { ProfileValidation } from "../../components/Validation/UserValidation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { InlineError } from "../../components/Notification/Error";
import { Imagepreview } from "../../components/imagePreview";
import {
  deleteProfileAcion,
  updateProfileAction,
} from "../../Redux/Actions/userActions";

function Profile() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);
  const [imageUrl, setImageUrl] = useState(userInfo ? userInfo.image : "");
  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.userDeleteProfile
  );
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.userUpdateProfile
  );
  // validate user
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ProfileValidation),
  });

  // update profille
  const onSubmit = (data) => {
    dispatch(updateProfileAction({ ...data, image: imageUrl }));
  };

  // delete profile

  const deleteProfile = () => {
    window.confirm("Are u sure you want to delete your profile") &&
      dispatch(deleteProfileAcion());
  };

  // useEffect

  useEffect(() => {
    if (userInfo) {
      setValue("fullName", userInfo?.fullName);
      setValue("email", userInfo?.email);
    }
    if (isSuccess) {
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
    }
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({ type: "USER_UPDATE_PROFILE_RESET" });
      dispatch({ type: "USER_DELETE_PROFILE_RESET" });
    }
  }, [userInfo, dispatch, setValue, isSuccess, isError, deleteError]);
  return (
    <Sidebar>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <h2 className="text-xl font-bold">Update Profile</h2>
        <div className="w-full grid lg:grid-cols-12 gap-6">
          <div className="col-span-10">
            <Uploader setImageUrl={setImageUrl} />
          </div>
          {/* image preview  */}
          <div className="col-span-2">
            <Imagepreview
              image={imageUrl}
              name={userInfo ? userInfo.fullName : "Daveflix"}
            />
          </div>
        </div>

        <div className="w-full">
          <Input
            label="FullName"
            placeholder="Daveflix React App"
            type="text"
            bg={true}
            name="fullName"
            register={register("fullName")}
          />

          {errors.fullName && <InlineError text={errors.fullName.message} />}
        </div>

        <div className="w-full">
          <Input
            label="Email"
            placeholder="Daveflix@gmail.com"
            type="email"
            name="email"
            register={register("email")}
            bg={true}
          />

          {errors.email && <InlineError text={errors.email.message} />}
        </div>
        <div className="flex gap-2 flex-wrap flex-col-reverse sm:flex-row justify-between items-center my-4">
          <button
            onClick={deleteProfile}
            disabled={deleteLoading || isLoading}
            className="bg-subMain transitions font-medium hover:bg-main border border-subMain text-white py-4 rounded px-6 w-full sm:w-auto"
          >
            {isLoading ? "Deleting..." : "  Delect Account"}
          </button>
          <button
            disabled={deleteLoading || isLoading}
            className="bg-main transitions font-medium hover:bg-subMain border border-subMain text-white py-4 rounded px-6 w-full sm:w-auto"
          >
            {deleteLoading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </Sidebar>
  );
}

export default Profile;

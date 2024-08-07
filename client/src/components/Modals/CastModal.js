import React, { useEffect, useState } from "react";
import MainModal from "./MainModal";
import { Input } from "../UsedInputs";
import Uploader from "../Uploader";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  addCastAction,
  updateCastAction,
} from "../../Redux/Actions/MoviesAction";
import toast from "react-hot-toast";
import { InlineError } from "../Notification/Error";
import { Imagepreview } from "../imagePreview";

function CastModal({ modalOpen, setModalOpen, cast }) {
  const dispatch = useDispatch();
  const [castImage, setCastImage] = useState("");
  const generateId = Math.floor(Math.random() * 100000000);
  const image = castImage ? castImage : cast?.image;

  // validate movie
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Cast name is required"),
      })
    ),
  });

  // on submit
  const onSubmit = (data) => {
    if (cast) {
      // if cast is not null then update cast
      dispatch(
        updateCastAction({
          ...data,
          image: image,
          id: cast.id,
        })
      );
      toast.success("Cast updated sucessfully");
    } else {
      // else create cast
      dispatch(
        addCastAction({
          ...data,
          image: image,
          id: generateId,
        })
      );
      toast.success("Cast created sucessfully");
    }
    reset();
    setCastImage("");
    setModalOpen(false);
  };

  useEffect(() => {
    if (cast) {
      setValue("name", cast?.name);
    }
  }, [cast, setValue]);

  return (
    <MainModal modalOpen={modalOpen} setModalOpen={setModalOpen}>
      <div className="inline-block sm:w-4/5 border border-border md:w-3/5 lg:w-2/5 w-full align-middle p-10 overflow-y-auto h-full bg-main text-white rounded-2xl  ">
        <h2 className="text-3xl font-bold">
          {cast ? "Update Cast" : "Create cast"}
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6 text-left mt-6"
        >
          <div className="w-full">
            <Input
              label="Cast Name"
              placeholder="David Amire"
              type="text"
              bg={true}
              name="name"
              register={register("name")}
            />

            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">Cast Image</p>
            <Uploader setImageUrl={setCastImage} />
            <Imagepreview
              image={image ? image : "/assets/logo.jpeg"}
              name="castImage"
            />
          </div>
          <button
            type="submit"
            className="w-full flex-rows gap-4 py-3 text-lg font-bold transitions hover:bg-dry border-2 border-subMain rounded bg-subMain text-white"
          >
            {cast ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </MainModal>
  );
}

export default CastModal;

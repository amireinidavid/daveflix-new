import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Input, Message, Select } from "../../../components/UsedInputs";
import Uploader from "../../../components/Uploader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastModal from "../../../components/Modals/CastModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { movieValidation } from "../../../components/Validation/MovieValidation";
import { useForm } from "react-hook-form";
import {
  createMovieAction,
  removeCastAction,
} from "../../../Redux/Actions/MoviesAction";
import toast from "react-hot-toast";
import { InlineError } from "../../../components/Notification/Error";
import { Imagepreview } from "../../../components/imagePreview";

function Addmovies() {
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // use Selector
  const { categories } = useSelector((state) => state.categoryGetAll);

  const { isLoading, isError, isSuccess } = useSelector(
    (state) => state.createMovie
  );

  const { casts } = useSelector((state) => state.casts);

  // validate movie
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(
      createMovieAction({
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
        video: videoUrl,
        casts,
      })
    );
  };

  // delete cast handler

  const deleteCastHandler = (id) => {
    dispatch(removeCastAction(id));
    toast.success("Cast deleted sucessfully");
  };

  useEffect(() => {
    if (modalOpen === false) {
      setCast();
    }
    // if its sucess then rest form and navigate to addmovies
    if (isSuccess) {
      reset({
        name: "",
        time: 0,
        language: "",
        year: 0,
        category: "",
        desc: "",
      });
      setImageTitle("");
      setImageWithoutTitle("");
      setVideoUrl("");
      dispatch({ type: "CREATE_MOVIE_RESET" });
      navigate("/addmovie");
    }
    // if error
    if (isError) {
      toast.error("Something went wrong");
      dispatch({ type: "CREATE_MOVIE_RESET" });
    }
  }, [modalOpen, isSuccess, isError, dispatch, reset, navigate]);
  return (
    <Sidebar>
      <CastModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-bold ">Create Movie</h2>
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Movie Title"
              placeholder="Game of Thrones"
              type="text"
              bg={true}
              name="name"
              register={register("name")}
            />

            {errors.name && <InlineError text={errors.name.message} />}
          </div>
          <div className="w-full">
            <Input
              label="Hours"
              placeholder="2hr"
              type="number"
              bg={true}
              name="time"
              register={register("time")}
            />

            {errors.time && <InlineError text={errors.time.message} />}
          </div>
        </div>

        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="w-full">
            <Input
              label="Language Used"
              placeholder="English"
              type="text"
              bg={true}
              name="language"
              register={register("language")}
            />

            {errors.language && <InlineError text={errors.language.message} />}
          </div>

          <div className="w-full">
            <Input
              label="Year Of Release"
              placeholder="2022"
              type="number"
              bg={true}
              name="year"
              register={register("year")}
            />

            {errors.year && <InlineError text={errors.year.message} />}
          </div>
        </div>

        {/* images */}
        <div className="w-full grid md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image Without title
            </p>
            <Uploader setImageUrl={setImageWithoutTitle} />
            <Imagepreview image={imageWithoutTitle} name="Imagewithouttitle" />
          </div>
          {/* images with title */}
          <div className="flex flex-col gap-2">
            <p className="text-border font-semibold text-sm">
              Image With title
            </p>
            <Uploader setImageUrl={setImageTitle} />
            <Imagepreview image={imageTitle} name="ImageTitle" />
          </div>
        </div>
        {/* description */}
        <div className="w-full">
          <Message
            label="Movie Description"
            placeholder="Make it short and sweet"
            name="desc"
            register={{ ...register("desc") }}
          />
          {errors.desc && <InlineError text={errors.desc.message} />}
        </div>

        {/* category */}
        <div className="text-sm w-full">
          <Select
            label="Movie Category"
            options={categories?.length > 0 ? categories : []}
            name="category"
            register={{ ...register("category") }}
          />
          {errors.category && <InlineError text={errors.category.message} />}
        </div>

        {/* movie Video */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-border font-semibold text-sm">
            Movie Video
          </label>
          <div className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}>
            {videoUrl && (
              <div className="w-full bg-main text-sm text-subMain py-4 border border-border rounded flex-colo">
                Video Uploaded!!!
              </div>
            )}
            <Uploader setImageUrl={setVideoUrl} />
          </div>
        </div>
        {/* casts */}
        <div className="grid w-full lg:grid-cols-2 gap-6 items-start">
          <button
            onClick={() => setModalOpen(true)}
            className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
          >
            Add Cast
          </button>
          <div className="grid 2xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-4 grid-cols-2 gap-4">
            {casts?.length > 0 &&
              casts?.map((user) => (
                <div
                  key={user.id}
                  className="p-2 italic text-xs text-text rounded flx-colo bg-main border border-border"
                >
                  <img
                    src={`${user?.image ? user.image : "./assets/logo.jpeg"}`}
                    alt={user?.name}
                    className="w-full h-24 object-cover rounded mb-2"
                  />
                  <p>{user?.name}</p>
                  <div className="flex-rows mt-2 w-full gap-2">
                    <button
                      onClick={() => deleteCastHandler(user?.id)}
                      className="w-6 h-6 bg-dry border flex-colo text-subMain border-border rounded "
                    >
                      <MdDelete />
                    </button>
                    <button
                      onClick={() => {
                        setCast(user);
                        setModalOpen(true);
                      }}
                      className="w-6 h-6 bg-dry border flex-colo text-green-600 border-border rounded "
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
        {/* submit */}
        <button
          disabled={isLoading}
          onClick={handleSubmit(onSubmit)}
          className="bg-subMain w-full flex-rows gap-6  font-medium  text-white py-4 rounded "
        >
          {isLoading ? (
            "Please wait..."
          ) : (
            <>
              <ImUpload /> Publish Movie
            </>
          )}
        </button>
      </div>
    </Sidebar>
  );
}

export default Addmovies;

import React, { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import { Input, Message, Select } from "../../../components/UsedInputs";
import Uploader from "../../../components/Uploader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { ImUpload } from "react-icons/im";
import CastModal from "../../../components/Modals/CastModal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { movieValidation } from "../../../components/Validation/MovieValidation";
import { useForm } from "react-hook-form";
import {
  getMovieByIdAction,
  removeCastAction,
  updateMovieAction,
} from "../../../Redux/Actions/MoviesAction";
import toast from "react-hot-toast";
import { InlineError } from "../../../components/Notification/Error";
import { Imagepreview } from "../../../components/imagePreview";
import Loader from "../../../components/Notification/Loader";
import { RiMovie2Line } from "react-icons/ri";

function EditMovie() {
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  const [modalOpen, setModalOpen] = useState(false);
  const [cast, setCast] = useState(null);
  const [imageWithoutTitle, setImageWithoutTitle] = useState("");
  const [imageTitle, setImageTitle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  // use Selector
  const { categories } = useSelector((state) => state.categoryGetAll);

  const { isLoading, isError, movie } = useSelector(
    (state) => state.getMovieById
  );

  const {
    isLoading: editLoading,
    isError: editError,
    isSuccess,
  } = useSelector((state) => state.updateMovie);

  const { casts } = useSelector((state) => state.casts);

  // validate movie
  const {
    register,
    handleSubmit,

    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(movieValidation),
  });

  // on submit
  const onSubmit = (data) => {
    dispatch(
      updateMovieAction(movie?._id, {
        ...data,
        image: imageWithoutTitle,
        titleImage: imageTitle,
        video: videoUrl,
        casts: casts.length > 0 ? casts : movie?.casts,
      })
    );
  };

  // delete cast handler

  const deleteCastHandler = (id) => {
    dispatch(removeCastAction(id));
    toast.success("Cast deleted sucessfully");
  };

  useEffect(() => {
    if (movie?._id !== id) {
      dispatch(getMovieByIdAction(id));
    } else {
      setValue("name", movie?.name);
      setValue("time", movie?.time);
      setValue("language", movie?.language);
      setValue("year", movie?.year);
      setValue("category", movie?.category);
      setValue("desc", movie?.desc);
      setImageWithoutTitle(movie?.image);
      setImageTitle(movie?.titleImage);
      setVideoUrl(movie?.video);
    }
    // if modal is false then reset cast
    if (modalOpen === false) {
      setCast();
    }
    // if its sucess then rest form and navigate to EditMovie
    if (isSuccess) {
      dispatch({ type: "UPDATE_MOVIE_RESET" });
      navigate(`/edit/${id}`);
    }
    // if error
    if (editError) {
      toast.error("Something went wrong");
      dispatch({ type: "UPDATE_MOVIE_RESET" });
    }
  }, [
    dispatch,
    id,
    movie,
    modalOpen,
    setValue,
    isSuccess,
    editError,
    navigate,
  ]);
  return (
    <Sidebar>
      <CastModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        cast={cast}
      />
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-0 rounded-full bg-dry text-subMain text-4xl">
            <RiMovie2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <h2 className="text-xl font-bold ">Edit "{movie?.name}"</h2>
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

              {errors.language && (
                <InlineError text={errors.language.message} />
              )}
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
              <Imagepreview
                image={imageWithoutTitle}
                name="Imagewithouttitle"
              />
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
            <div
              className={`w-full grid ${videoUrl && "md:grid-cols-2"} gap-6`}
            >
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
            <div className="w-full">
              <button
                onClick={() => setModalOpen(true)}
                className="w-full py-4 bg-main border border-subMain border-dashed text-white rounded"
              >
                Add Cast
              </button>
              <span className="text-border text-sm">
                if you add new casts the previous casts will be deleted. So you
                should add them again
              </span>
            </div>

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
            {isLoading || editLoading ? (
              "Updating..."
            ) : (
              <>
                <ImUpload />
                Update Movie
              </>
            )}
          </button>
        </div>
      )}
    </Sidebar>
  );
}

export default EditMovie;

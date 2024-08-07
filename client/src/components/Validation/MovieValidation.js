import * as yup from "yup";

const ReviewValidation = yup.object().shape({
  comment: yup
    .string()
    .required("Comment is required")
    .max(150, "Comment should be less than 150 characters"),
  rating: yup.number().required("Select a rating"),
});

const movieValidation = yup.object().shape({
  name: yup
    .string()
    .required("Please enter a movie name")
    .max(50, "Please name should be less than 50 characters"),
  time: yup.number().required("Please enter a movie duration"),
  language: yup.string().required("please enter a movie language"),
  year: yup.number().required("Pleaseenter your of release"),
  category: yup.string().required("Please select movie category"),
  desc: yup
    .string()
    .required("please enter a movie description")
    .max(300, "Movie description should be less than 300 characters"),
});

export { ReviewValidation, movieValidation };

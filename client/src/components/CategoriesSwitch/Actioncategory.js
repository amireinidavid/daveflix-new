import React from "react";
import Layout from "../../Layout/Layout";
import Head from "../Head";
import Movie from "../Movie";
import { Movies } from "../../Data/MovieData";

function Actioncategory() {
  const Action = Movies.filter((movie) => movie.category === "Action");
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="Action Category" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid  xl:grid-cols-4 gap-4 xl:gap-16 items-center  ">
            {Action.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Actioncategory;

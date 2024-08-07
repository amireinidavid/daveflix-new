import React from "react";
import Layout from "../../Layout/Layout";
import Head from "../Head";
import Movie from "../Movie";
import { Movies } from "../../Data/MovieData";

function AnimationCat() {
  const Animation = Movies.filter((movie) => movie.category === "Anime");
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="Animation category" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid  xl:grid-cols-4 gap-4 xl:gap-16 items-center  ">
            {Animation.map((movie, index) => (
              <Movie key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AnimationCat;

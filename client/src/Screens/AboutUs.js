import React from "react";
import Layout from "../Layout/Layout";
import Head from "../components/Head";

function AboutUs() {
  return (
    <Layout>
      <div className="min-height-screen container mx-auto px-2 my-6">
        <Head title="About Us" />
        <div className="xl:py-20 py-10 px-4">
          <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center  ">
            <div>
              <h3 className="text-lg lg:text-3xl mb-4 font-semibold">
                Welcome To Daveflix
              </h3>
              <div className="mt-3 text-sm leading-8 text-text ">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique, ea officia? Asperiores beatae a saepe commodi totam
                  accusantium at, quos accusamus est unde, distinctio dolores
                  cupiditate sequi perspiciatis placeat nisi! Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Similique, ea officia?
                  Asperiores beatae a saepe commodi totam accusantium at, quos
                  accusamus est unde, distinctio dolores cupiditate sequi
                  perspiciatis placeat nisi! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Similique, ea officia?
                  Asperiores beatae a saepe commodi totam accusantium at, quos
                  accusamus est unde, distinctio dolores cupiditate sequi
                  perspiciatis placeat nisi!
                </p>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Similique, ea officia? Asperiores beatae a saepe commodi totam
                  accusantium at, quos accusamus est unde, distinctio dolores
                  cupiditate sequi perspiciatis placeat nisi! Lorem ipsum dolor
                  sit amet consectetur adipisicing elit. Similique, ea officia?
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold mt-4">
                    10K
                  </span>
                  <h4 className="font-semibold text-lg  mb-1 ">
                    Listed Movies
                  </h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
                <div className="p-8 bg-dry rounded-lg">
                  <span className="text-3xl block font-extrabold mt-4">8K</span>
                  <h4 className="font-semibold text-lg  mb-1 ">Lovely Users</h4>
                  <p className="mb-0 text-text leading-7 text-sm">
                    Completely free without registration
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-10 lg:mt-0">
              <img
                src="/assets/about.jpg"
                alt=""
                className="w-full xl:block hidden h-header rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AboutUs;

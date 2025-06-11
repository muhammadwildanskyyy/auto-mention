import Loader from "@/src/components/global/loader";
import React from "react";

type props = {};
const loading = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <Loader state>...LOADING</Loader>
    </div>
  );
};

export default loading;

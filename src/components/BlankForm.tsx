import React from "react";
import { useParams } from "react-router";

const BlankForm = () => {
  const { id } = useParams<{ id: string }>();

  console.log(id);

  return (
    <>
      <h3>blank form</h3>
    </>
  );
};

export default BlankForm;

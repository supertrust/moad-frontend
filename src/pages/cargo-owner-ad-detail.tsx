import React, { useState } from "react";
import Info from "@src/sections/cargo-owner-ad-detail/info";
import Apply from "@src/sections/cargo-owner-ad-detail/apply";
import Final from "@src/sections/cargo-owner-ad-detail/final";

export default function CargOwnerAdDetail() {
  const [page, setPage] = useState("pageone");
  const nextPage = (page: any) => {
    setPage(page);
  };
  return (

    <div>
      {
        {
          pageone: <Info onButtonClick={nextPage} />,
          pagetwo: <Apply onButtonClick={nextPage} />,
          pagethree: <Final onButtonClick={nextPage} />,
        }[page]
      }
    </div>
  );
}

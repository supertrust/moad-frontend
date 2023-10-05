import Link from "next/link";
import React, { useState } from "react";
import { styles } from "@src/sections/cargo-owner-signup";
import Info from "@src/sections/cargo-owner-signup/pages/Info";
import SubscriptionAgreement from "@src/sections/cargo-owner-signup/pages/subscriptionAgreement";
import Form from "@src/sections/cargo-owner-signup/pages/form";
export default function CargOwnerSignup() {

 
  const [page, setPage] = useState("pageone");
  const nextPage = (page: any) => {
    setPage(page);
  };

  
  return (
    <div className={styles.multistep}>
      {
        {
          pageone: <Info onButtonClick={nextPage} />,
          pagetwo: <SubscriptionAgreement onButtonClick={nextPage} />,
          pagethree: <Form  />,
        }[page]
      }
    </div>
  );
}

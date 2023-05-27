import { useRouter } from "next/router";
import EditInquiryAnswer from "./index";
import { useGetUserRole } from "@src/apis/user";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@src/contexts/AuthContext";

export default function Form() {
  const router = useRouter();
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const authValue = useContext(AuthContext);
  useEffect(() => {
    if (authValue) {
      setisAuthenticated(authValue.isAuthenticated);
    }
  }, []);

  const { data } = useGetUserRole({ isAuthenticated });
  return (
    <>
      {data?.role_name === "Admin" ? (
        <EditInquiryAnswer id={router.query.id as string} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <h1 className="font-semibold">
            Only admin is allowed to update data
          </h1>
        </div>
      )}
    </>
  );
}

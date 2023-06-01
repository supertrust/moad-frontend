import { useRouter } from "next/router";
import EditInquiryAnswer from "./index";
import useAuth from "@src/hooks/useAuth";

export default function Form() {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <>
      {user?.role === "Admin" ? (
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

import SingleInquireModulePage from "@/modules/CustomerService/Pages/SingleInquireModulePage";
import { useRouter } from "next/router";

export default function Inquire() {
  const router = useRouter();
  return (
    <SingleInquireModulePage id={router.query.id} />
  )
}

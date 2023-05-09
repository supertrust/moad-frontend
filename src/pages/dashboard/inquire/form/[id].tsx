import { useRouter } from "next/router"
import Index from "./index";

export default function Form() {
  const router = useRouter();
  return (
    <Index id={router.query.id as string} />
  )
}

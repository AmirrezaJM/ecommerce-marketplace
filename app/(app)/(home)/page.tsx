import Image from "next/image";
import { getPayload } from "payload";
import configPromise from "@/payload.config";

export default async function Home() {
  const payload = await getPayload({
    config: configPromise,
  });


  return (
    <div>
      page
    </div>
  );
}

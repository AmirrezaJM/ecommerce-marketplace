"use client";

import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";


export default function Home() {
  const trpc = useTRPC();
  const { data } = useQuery(trpc.auth.session.queryOptions());
  return (
    <div>
      {JSON.stringify(data,null,2)}
    </div>
  );
}


// tRPC query client side go over the fetch API whereas server will directly call the DB
// const { data } = useQuery({
//   queryKey: ['hello', { text: 'world' }],
//   queryFn: () =>
//     trpc.hello.query({
//       text: 'world',
//     }),
// });
// TRPC SERVER goes directrly to server
// import { useQuery } from "@tanstack/react-query";
// import { useTRPC } from "@/trpc/client";
//   const queryClient = useTRPC();
// const categories = useQuery(queryClient.categories.getMany.queryOptions());
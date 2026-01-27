"use client";

export default function Home() {
  return (
    <div>
      Home
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
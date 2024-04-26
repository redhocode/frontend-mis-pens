// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// export default async function Dashboard() {
//   const session = await getServerSession(authOptions);
//   return (
//     <main className="mt-10">
//       <h1>Hello World</h1>
//       <pre>{JSON.stringify(session)}</pre>
//           </main>
//   );
// }

export default function Dashboard() {
  return (
    <>
      <div className="grid grid-rows-3 grid-flow-col gap-4">
        <div className="row-span-3 ...">01</div>
        <div className="col-span-2 ...">02</div>
        <div className="row-span-2 col-span-2 ...">03</div>
      </div>
    </>
  );
}


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
    <main className="">
      <h1>Hello World</h1>
    </main>
  );
}

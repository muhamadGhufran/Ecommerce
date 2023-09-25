import Signin from "./client/signin";

export default function Home() {
    return <Signin />
  }
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import { useEffect } from "react";

// export default function Home(){
// const {data: session} = useSession();
// const router = useRouter();


// useEffect(() => {
//   if (!session) {
//     router.push('/login_client');
//   } else {
//     router.push('/front_first_page');
//   }
// }, [session, router]);

// return null; // You can return null or any other component/content you want here
// }

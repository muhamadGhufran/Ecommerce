import Layout from "@/components_admin/Layout";
import Login from "@/components_admin/Login"
import Nav from "@/components_admin/Nav";
import { useSession } from "next-auth/react"
export default function admin(){
    const {data: session} = useSession();

    return<Layout>
       <div className="text-blue-900 flex justify-between">
         <h2>
           Hello, <b>{session?.user?.name}</b>
         </h2>
         <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
           <img src={session?.user?.image} alt="" className="w-6 h-6"/>
           <span className="px-2">
             {session?.user?.name}
           </span>
         </div>
       </div>
     </Layout>
}
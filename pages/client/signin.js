import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { loginUser } from "@/helpers";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false)

  const router = useRouter();

  const handleSignIn = async (e) =>{
    e.preventDefault();

    try{
      setLoading(true);

      const loginRes = await loginUser({email, password})

      if(loginRes && !loginRes.ok){
        toast.error(loginRes.error || "")
      }
      else {
        console.log("User signed in");
        console.log("Redirecting to /front_first_page");
        router.push("/client/main");
      }
    } catch (error){
      if(error instanceof AxiosError){
        const errorMsg = error.response?.data?.error
        toast.error(errorMsg)
      }
    }
    setLoading(false)
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="flex justify-center items-center gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>Ecommerce</h1>
        <form className="mt-6" onSubmit={handleSignIn}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-2">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </div>
          {/* {submitError && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {submitError}
          </div>
        )}  */}
        <p className="mt-4 text-sm text-center text-gray-700">
          Don't have an account?{" "}
          <Link
            href='/client/signup'
            className="font-medium text-blue-600 hover:underline"
          >
            Sign up
          </Link>
        </p>
        </form>

      </div>
    </div>
  );
}
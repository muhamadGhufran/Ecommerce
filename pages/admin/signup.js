import { useState } from "react"
import {useRouter} from 'next/navigation'
import Link from 'next/link'
import axios, { AxiosError } from "axios";
import { loginUser2 } from "@/helpers";
import toast from "react-hot-toast";
 
export default function RegisterPage() {
  const [data, setData] = useState({
    fullName: "",
    emailAdmin: "",
    password: "",
    confirmPassword: ""
  })
  
  const [validationErrors, setValidationErrors] = useState([]);
  const [submitError, setSubmitError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter();

  const registerAdmin = async (e) => {
    e.preventDefault();
    if(data.fullName.length < 3){
      toast.error("Full name should be atleast 3 characters long")
    }else if (data.password && data.password.length < 6) {
      toast.error("Password should be at least 6 characters long");
    }else if(data.password !== data.confirmPassword){
      toast.error("Passwords don't match")
    }else{
        try {
        console.log("button clicked");
        setLoading(true);
        console.log("button clicked here");
        const apiRes = await axios.post("/api/auth/signup_admin", data);
        if (apiRes?.data?.success) {
          console.log('Registration successful. Redirecting to login page.');
          const loginRes = await loginUser2({
            emailAdmin: data.emailAdmin,
            password: data.password
          });
  
          if (loginRes && !loginRes.ok) {
            toast.error("error");
          } else {
            router.push("/admin/signin");
          }
        }
        console.log("button clicked here also");
        console.log("button clicked");
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMsg = error.response?.data?.error;
          toast.error(errorMsg);
        }
      }
      setLoading(false);
    }
  };

    return(
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
    <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
      <h1 className="flex justify-center items-center gap-4"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>Ecommerce/Admin</h1>
      <form className="mt-6" onSubmit={registerAdmin}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-semibold text-gray-800"
          >
            Name
          </label>
          <input
            type="text"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={data.fullName}
            onChange={(e) => setData({...data, fullName: e.target.value})}
          />
        </div>
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
            value={data.emailAdmin}
            onChange={(e) => setData({...data, emailAdmin: e.target.value})}
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
            value={data.password}
            onChange={(e) => setData({...data, password: e.target.value})}
          />
        </div>
        <div className="mb-2">
          <label
            htmlFor="password"
            className="block text-sm font-semibold text-gray-800"
          >
            Confirm Password
          </label>
          <input
            type="password"
            className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
            value={data.confirmPassword}
            onChange={(e) => setData({...data, confirmPassword: e.target.value})}
          />
        </div>
        {/* {submitError && (
          <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
            {submitError}
          </div>
        )}   */}
        <div className="mt-2">
          <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Sign Up
          </button>
        </div>
      </form>

      <p className="mt-4 text-sm text-center text-gray-700">
        Already have an account?{" "}
        <Link
          href='/admin/signin'
          className="font-medium text-blue-600 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </div>
  </div>
)
}
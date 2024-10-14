import { ChangeEvent , useState} from "react"
import { Link, useNavigate } from "react-router-dom"
import {SignupInput} from "@pemdorjee11/medium-common/dist"
import axios from 'axios'


import { BACKEND_URL } from "../config"
export const Auth = ({type} : {type:"signup" | "signin"})    => {
 const navigate = useNavigate();
 const [postInputs, setPostInputs] = useState<SignupInput>({    
    email:"",
    password:"",
    name:""
 });
 async function sendRequest(){
try{
    const response= await axios.post(`${BACKEND_URL}/api/v1/user/${type ==="signup"? "signup": "signin"}`, postInputs)
    const jwt = response.data;
    console.log(jwt.token)
    localStorage.setItem("token",jwt.token);
    navigate("/blogs")
}
 
catch(e){
    alert("request failed")
    console.log(e)
}
 
}
 return  <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                  
                    <div className="px-10">
                    <div className="text-3xl font-extrabold ">
                        Create an Account
                    </div>
                    <div className="text-slate-500">
                       {type ==="signin"? "Dont't have an account":" Already have an account?"}   
                        <Link className="pl-2 underline" to ={type === "signin"? "/signup": "/signin"}>  {type ==="signin"? "Signup" : "Login"}</Link>
                    </div>
                    </div>
                   {type === "signup"?<LabelledInput label="Name" placeholder="JOHN SHARMA" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        name: e.target.value
                    })
                 }}/>: null } 
                  <LabelledInput label="email" placeholder="John@gmail.com" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        email: e.target.value
                    })
                 }}/>
                  <LabelledInput label="Password" type="password" placeholder="12346579" onChange={(e) => {
                    setPostInputs({
                        ...postInputs,
                        password: e.target.value
                    })
                 }}/>
                 <button type="button" onClick={sendRequest} className="py-2.5 px-5 me-2 mb-3 text-sm w-full mt-6 font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">{type === "signup"? "sign up" : "Sign in"}</button>
                 </div>     
            </div>
         </div>   

}
interface LabelledInputtype {
    label : string,
    placeholder: string,
    onChange  : (e: ChangeEvent<HTMLInputElement>) => void;            
    // explain this 
    type?: string;
}

function LabelledInput({label, placeholder, onChange, type}: LabelledInputtype){
    return <div>
            <div>
            <label  className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">{label}</label>
            <input onChange={onChange} type={type || "text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
             </div>
    </div>
}
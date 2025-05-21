import {z} from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm} from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { mockUsers } from "../../services/users";

const loginSchema = z.object({
    email: z.string().email("invalid email address"),
    password: z.string().min(6)
})

type User = z.infer<typeof loginSchema>

export default function Login() {
    const [loginError,setLoginError] = useState("")
    const {register,handleSubmit,formState: { errors },} = useForm<User>({resolver:zodResolver(loginSchema)});
    const navigate = useNavigate();
    const {login} = useAuth()


    const onSubmit:SubmitHandler<User> = (data) => {
       const user = mockUsers.find((curUser)=> curUser.email === data.email && curUser.password === data.password);
       if(user){
        // Stores Token in local storage
           login(user.token);
           navigate("/");
        }else{
            setLoginError("Invalid Credentials");
        }
    }
  return (
    <section onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center h-dvh">
        <form className="flex flex-col max-w-[500px] w-full p-10">
            <h1 className="text-4xl font-bold mb-5">Login</h1>
            <input type="email" placeholder="Email" className="input-base mb-4" {...register("email")}/>
            {errors.email && (
                 <p className="text-red-500 text-sm mb-3">{errors.email.message}</p>
            )}
            <input type="password" placeholder="Password" className="input-base mb-5" {...register("password")}/>
            {errors.password && (
                <p className="text-red-500 text-sm mb-3">{errors.password.message}</p>
            )}
            {loginError && <p className="text-red-500 text-sm mb-3">{loginError}</p>}
            <button type="submit" className="btn-primary hover:cursor-pointer">Login</button>
        </form>
    </section>
  )
}
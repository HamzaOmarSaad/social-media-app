import axios from "axios";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import Signup from "./signup";
import { Link, useNavigate } from "react-router";
import AppButton from "../shared/appButton";
import { useState } from "react";
import { UserContext } from "../context/UserContext";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMsg from "../shared/errorMsg";

export default function Login() {
    const schema = z.object({
        email: z.string().email("Please enter a valid email"),
        password: z.string().min(8, "Password must be at least 8 characters").max(16, "Password must be at most 16 characters").regex(/^[A-Z][\w]*/, "Password must start with a capital letter"),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(schema)
    });

    const router = useNavigate();

    const [isloading, setIsloading] = useState(false);

    async function logSend(values) {
        setIsloading(true);
        try {
            const response = await axios.post("https://linked-posts.routemisr.com/users/signin", values);
            
            localStorage.setItem("token" ,response.data?.token)
            router("/posts");
        } catch (error) {
            console.log("🚀 ~ logSend ~ error:", error);
        } finally {
            setIsloading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(logSend)} className="flex max-w-md flex-col gap-4 mx-auto mt-42">
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email1">Your email</Label>
                </div>
                <TextInput 
                    id="email1" 
                    type="email" 
                    placeholder="name@flowbite.com"                    
                    {...register("email")} 
                />
                <ErrorMsg error={errors.email?.message} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="password1">Your password</Label>
                </div>
                <TextInput 
                    id="password1" 
                    type="password"  
                    placeholder="*****************" 
                    {...register("password")} 
                />
                <ErrorMsg error={errors.password?.message} />
            </div>
            <p>
                Don't have an account? <Link to={"/register"} className="text-blue-400">Register</Link>
            </p>
            <AppButton type="submit" isloading={isloading}>
                Login
            </AppButton>
        </form>
    );
}
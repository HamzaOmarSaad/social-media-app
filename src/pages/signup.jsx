import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Button, Checkbox, Datepicker, Label, Select, TextInput } from "flowbite-react";
import { Watch } from "iconsax-reactjs";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import * as z from "zod"
import ErrorMsg from "../shared/errorMsg";
import toast from "react-hot-toast";


export default function Signup() {

    const schema= z.object({
    name: z.string("name must be string").min(3 ,"nmae must be 3 char at least"),
    email: z.email(),
    password : z.string().min(8).max(16).regex(/^[A-Z][\w]/ , "must start with capital letter"),
    rePassword : z.refine((value)=> value=== getValues("password") , {error:"password must match "}),
    gender :z.literal( ['male',"female"]),
    dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}/,'enter a valid data ')
})

    const{ register, handleSubmit ,watch, getValues ,formState:{errors} }=useForm( {resolver:zodResolver(schema)})
    const router=useNavigate()


    async function registerSend(values){
        try {
            await axios.post('https://linked-posts.routemisr.com/users/signup', values)
        router("/login")

        toast.success("registeration done");

        } catch (error) {
            toast.error(error?.response?.data?.error);

            
        }

    }
  return (
        <form  onSubmit={handleSubmit(registerSend)} className="flex max-w-md flex-col gap-4 mx-auto mt-22  ">
            <div className="name-in">
                <div className="mb-2 block">
                <Label htmlFor="name">Enter name</Label>
                </div>
                <TextInput id="name" type="text" placeholder="Hamzon "  {...register("name")} />
                <ErrorMsg error={errors.name?.message}/>
            </div>
            <div className="email-in">
                <div className="mb-2 block">
                <Label htmlFor="email1">Your email</Label>
                </div>
                <TextInput id="email1" type="email" placeholder="name@flowbite.com"  {...register("email")} />
                <p className="text-red-600 mt-1">{errors.email?.message}</p>
                </div>  
            
            <div className="pass1">
                <div className="mb-2 block">
                <Label htmlFor="password1">Your password</Label>
                </div>
                <TextInput id="password1" type="password"  placeholder="*****************" {...register("password")} />
                <p className="text-red-600 mt-1">{errors.password?.message}</p>

            </div>
            {watch("password") &&
            <div className="repass">
                <div className="mb-2 block">
                <Label htmlFor="repass">renter password</Label>
                </div>
                <TextInput id="repass" type="password"  placeholder="*****************" {...register("rePassword")} />
                <p className="text-red-600 mt-1">{errors.rePassword?.message}</p>
            </div>}

            <div className="max-w-md gender-in">
                <div className="mb-2 block">
                    <Label htmlFor="gender">Select your gender</Label>
                </div>
                <Select id="gender" {...register("gender")} >
                    <option>male</option>
                    <option>female</option>
                </Select>
                <p className="text-red-600 mt-1">{errors.gender?.message}</p>

            </div>
            <div className="date-birth">
                <div className="mb-2 block">
                    <Label htmlFor="dateOfBirth"> Enter your date of birth</Label>
                    <TextInput id="dateOfBirth" type="date"  {...register("dateOfBirth")} />
                    <p className="text-red-600 mt-1">{errors.password?.message}</p>

                </div>
            </div>
            <p> have an account <Link to={"/login"} className="text-blue-400">login</Link></p>

            <Button className="mb-23" type="submit">register</Button>
        </form>
  );
}

"use client";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormSchema } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";
import Logo from "../../../../public/cypresslogo.svg";
import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
const LoginPage = () => {
   // const router = useRouter();
   const [submitError, setSubmitError] = useState("");
   const form = useForm<z.infer<typeof FormSchema>>({
      resolver: zodResolver(FormSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });
   const isLoading = form.formState.isSubmitting;
   const onSubmit: SubmitHandler<z.infer<typeof FormSchema>> = (data) =>
      console.log(data);

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            onChange={() => {
               if (submitError) setSubmitError("");
            }}
            className="w-full sm:justify-center sm:w-[400px] space-y-6 flex flex-col"
         >
            <Link
               href="/"
               className="
          w-full
          flex
          justify-left
          items-center"
            >
               <Image src={Logo} alt="cypress Logo" width={50} height={50} />
               <span
                  className="font-semibold
          dark:text-white text-4xl first-letter:ml-2"
               >
                  cypress.
               </span>
            </Link>

            <FormDescription
               className="
        text-foreground/60"
            >
               An all-In-One Collaboration and Productivity Platform
            </FormDescription>

            <FormField
               disabled={isLoading}
               control={form.control}
               name="email"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input type="email" placeholder="Email" {...field} />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
            <FormField
               disabled={isLoading}
               control={form.control}
               name="password"
               render={({ field }) => (
                  <FormItem>
                     <FormControl>
                        <Input
                           type="password"
                           placeholder="Password"
                           {...field}
                        />
                     </FormControl>
                     <FormMessage />
                  </FormItem>
               )}
            />
         </form>
      </Form>
   );
};

export default LoginPage;

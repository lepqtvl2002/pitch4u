"use client"

import * as React from "react"

import {cn} from "@/lib/utils"
import {Icons} from "@/components/icons"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {actionLogin} from "@/server/actions/login-action";
import {experimental_useFormStatus as useFormStatus} from "react-dom"
import {signIn} from "next-auth/react";
import {Facebook} from "lucide-react";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
}

export function UserAuthForm({className, ...props}: UserAuthFormProps) {
    const {pending} = useFormStatus();
    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form action={actionLogin}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            id="email"
                            placeholder="name@example.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={pending}
                        />
                    </div>
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="password"
                            disabled={pending}
                        />
                    </div>
                    <Button disabled={pending}>
                        {pending && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        )}
                        Sign In
                    </Button>
                </div>
            </form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t"/>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
                </div>
            </div>
            <div className={"flex justify-between flex-col space-y-2"}>
                <Button onClick={() => signIn("google")} variant="outline" type="button" disabled={pending}>
                    {pending ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                    ) : (
                        <Icons.google className="mr-2 h-4 w-4"/>
                    )}{" "}
                    Google
                </Button>
                <Button onClick={() => signIn("facebook")} variant="outline" type="button" disabled={pending}>
                    {pending ? (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                    ) : (
                        <Facebook className="mr-2 h-4 w-4" />
                    )}{" "}
                    Facebook
                </Button>
            </div>
        </div>
    )
}
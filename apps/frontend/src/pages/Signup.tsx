import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BACKEND_URL } from "@/config";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

async function signup({ username, password }: { username: string, password: string }) {
    const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password
    });
    return response;
}

export default function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: signup,
        onSuccess: () => {
            // can be used to refetch
        }
    })

    return (
        <>
            <div className="flex min-h-screen min-w-screen">
                <div className="flex-1 min-h-screen bg-black">

                </div>
                <div className="flex-1 min-h-screen">
                    <div className="h-full flex items-center justify-center flex-col">
                        <Card className="p-8">
                            <Input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                            <Input placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            <Button onClick={() => {
                                try {
                                    mutation.mutate({
                                        username,
                                        password
                                    })
                                    navigate('/signin')
                                } catch (e) {
                                    alert("Error while signing up")
                                }
                            }} variant={"outline"}>Signup</Button>
                        </Card>
                    </div>

                </div>

            </div>
        </>
    )
}
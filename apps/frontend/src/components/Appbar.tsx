import { useNavigate } from "react-router";
import { Button } from "./ui/button";

export default function Appbar() {
    const navigate=useNavigate();
    return (
        <div className="bg-black text-white flex justify-between">
            <div className="text-xl p-4">
                HiggsField
            </div>
            <div className="flex">
                <div className="flex items-center p-2">
                    <Button onClick={()=>{navigate('signup')}} variant={"outline"}>Signup</Button>
                </div>
                <div className="flex items-center p-2">
                    <Button variant={"outline"}>Signin</Button>
                </div>
            </div>
        </div>
    )
}
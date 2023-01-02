import Infinity from "../public/Infinity.svg"
import Image from "next/image";

const Loader = () => {
    return ( 
        <div className="flex w-screen h-screen justify-center items-center">
            <Image width={400} height={400} className="text-2xl bg-opacity-40" alt="Loader"  src={Infinity}/>
        </div>
     );
}
 
export default Loader;
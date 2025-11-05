
import Image from "next/image";

export default function  Loading() {
    return(
       <div className="flex items-center justify-center h-screen bg-primary">
       <Image src="/icons/kuber-yantra-bg.svg" alt="Loading..." width={500} height={500} className="animate-ping" />
       </div>
    );
}

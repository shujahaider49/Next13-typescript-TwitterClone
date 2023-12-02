import { useRouter } from "next/router";
import { BsTwitter } from 'react-icons/bs'
import { FaXTwitter } from "react-icons/fa6";


const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div onClick={() => router.push('/')} className="rounded-full h-24 w-24 p-4 flex items-center justify-center hover:bg-blue-300 hover:bg-opacity-10 cursor-pointer transition">
        <FaXTwitter size={50} color="white"/>
    </div>
  );
};

export default SidebarLogo;

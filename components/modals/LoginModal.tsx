import useLoginModal from "@/hooks/useLoginModal"
import { useCallback, useState } from "react";
import Input from "../Input";
import Model from "../Model";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onSubmit = useCallback(async() => {
        try{
            setLoading(true);

            await signIn('credentials' ,{
              email,
              password
            });

            loginModal.onClose()
        }catch(error){
            console.log(error);
            toast.error("Not Working")
        }finally{
            setLoading(false);
        }
    },[loginModal, email, password])

    const onToggle = useCallback(() => {
      if(loading){
        return;
      }
  
      registerModal.onOpen();
      loginModal.onClose();
    },[loading,registerModal,loginModal])

    const bodyContent = (
        <div className="flex flex-col gap-4">
          <Input 
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            disabled={loading}  
          />
          <Input 
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            disabled={loading} 
          />
        </div>
      )

      const footerContent = (
        <div className="text-neutral-400 text-center mt-4">
          <p>
            First time using Twitter?
            <span
            onClick={onToggle}
              className="
                  text-white 
                  cursor-pointer 
                  hover:underline
                "
            >
              {" "}
              Create an account
            </span>
          </p>
        </div>
      );
  return (
    <Model
    disabled={loading}
    isOpen={loginModal.isOpen}
    title="Login"
    actionLabel="Sign in"
    onClose={loginModal.onClose}
    onSubmit={onSubmit}
    body={bodyContent}
    footer={footerContent}
    />
  )
}

export default LoginModal

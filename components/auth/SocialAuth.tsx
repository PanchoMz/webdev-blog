import { signIn } from "next-auth/react";
import Button from "../common/Button";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { LOGIN_REDIRECT } from "@/route";

const SocialAuth = () => {
   const handleOnClick =(provider: "github" | "google") => {
        signIn(provider,{
          redirectTo: LOGIN_REDIRECT
        })
    }
  return (  

    <div className="flex flex-col gap-2 md:flex-row">
      <Button 
        type="button"
        label="Continue with GitHub"
        outline
        icon={FaGithub}
        onClick={() => handleOnClick("github")}
      />
      <Button
        type="button"
        label="Continue with Google"
        outline
        icon={FaGoogle}
        onClick={() => handleOnClick("google")}
      />
    </div>
  );
};

export default SocialAuth;

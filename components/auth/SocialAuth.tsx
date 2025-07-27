import Button from "../common/Button";
import { FaGithub, FaGoogle } from "react-icons/fa";

const SocialAuth = () => {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <Button
        type="button"
        label="Continue with GitHub"
        outline
        icon={FaGithub}
      />
      <Button
        type="button"
        label="Continue with Google"
        outline
        icon={FaGoogle}
      />
    </div>
  );
};

export default SocialAuth;

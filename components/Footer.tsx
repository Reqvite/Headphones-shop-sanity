import { FC } from "react";
import { GoMarkGithub } from "react-icons/go";

const Footer: FC = () => {
  return (
    <div className="footer-container">
      <p>&copy; {new Date().getFullYear()} All Rights Reserved.</p>{" "}
      <a href="https://github.com/Reqvite">
        <GoMarkGithub />
      </a>
    </div>
  );
};

export default Footer;

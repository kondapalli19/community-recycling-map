import { ReactElement } from "react";
import { FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

export interface SocialLink {
  name: string;
  icon: ReactElement;
  href: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "Gmail",
    icon: <SiGmail />,
    href: "mailto:kkoyal19599@gmail.com", 
  },
  {
    name: "GitHub",
    icon: <FaGithub />,
    href: "https://github.com/kondapalli19/community-recycling-map/tree/dev",
  },
  {
    name: "Twitter",
    icon: <FaTwitter />,
    href: "#",
  },
  {
    name: "LinkedIn",
    icon: <FaLinkedinIn />,
    href: "https://linkedin.com/in/kkoyal/",
  }
];

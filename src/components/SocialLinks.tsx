import { Github, Linkedin, Mail } from "lucide-react";

type Copy = {
  github: string;
  linkedin: string;
  email: string;
};

type Props = {
  copy: Copy;
  githubUrl: string;
  linkedinUrl: string;
  email: string;
};

export default function SocialLinks({ copy, githubUrl, linkedinUrl, email }: Props) {
  return (
    <ul className="social-list">
      <li>
        <a href={githubUrl} className="social-link" target="_blank" rel="noreferrer" aria-label="GitHub profile">
          <Github size={16} strokeWidth={1.8} />
          <span data-i18n="github">{copy.github}</span>
        </a>
      </li>
      <li>
        <a href={linkedinUrl} className="social-link" target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
          <Linkedin size={16} strokeWidth={1.8} />
          <span data-i18n="linkedin">{copy.linkedin}</span>
        </a>
      </li>
      <li>
        <a href={`mailto:${email}`} className="social-link" aria-label="Send email">
          <Mail size={16} strokeWidth={1.8} />
          <span data-i18n="email">{copy.email}</span>
        </a>
      </li>
    </ul>
  );
}

import { Github, Linkedin, Mail, Twitter } from "lucide-react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Footer() {
  const socialLinks = [
    { icon: Github, href: "https://github.com/hemantpalled", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/buildwithphemant", label: "LinkedIn" },
    { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hemantpalled@gmail.com", label: "Email" },
  ];

  const navLinks = ["home", "about", "projects", "contact"];

  return (
    <footer className="bg-gray-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Nav links */}
          <div className="flex gap-6">
            {navLinks.map((id) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="text-white/40 hover:text-white/80 text-sm capitalize transition-colors"
              >
                {id}
              </button>
            ))}
          </div>
          {/* Social */}
          <div className="flex space-x-5">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/40 hover:text-white/80 transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
          <p className="text-xs text-white/25">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

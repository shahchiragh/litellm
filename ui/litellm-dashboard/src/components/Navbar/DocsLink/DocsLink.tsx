import { NAV_PRODUCT_LINK_CLASS } from "@/components/Navbar/navProductLinkClass";
import { ChevronDown } from "lucide-react";
import React from "react";

const ChevronWidthSpacer: React.FC = () => (
  <ChevronDown className="pointer-events-none size-2.5 opacity-0" aria-hidden />
);

export const DocsLink: React.FC<{ href: string | null }> = ({ href }) => {
  if (!href) {
    return null;
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={NAV_PRODUCT_LINK_CLASS}>
      Docs
      <ChevronWidthSpacer />
    </a>
  );
};

export default DocsLink;

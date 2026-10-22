import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NAV_PRODUCT_LINK_CLASS } from "@/components/Navbar/navProductLinkClass";
import { DocsLink } from "./DocsLink";

const sharedClasses = NAV_PRODUCT_LINK_CLASS.trim().split(/\s+/);

describe("DocsLink", () => {
  it("opens the docs in a new tab without leaking the opener", () => {
    render(<DocsLink href="https://docs.atlas.test/" />);

    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveAttribute("href", "https://docs.atlas.test/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("carries the same product-link styling as the Blog trigger, so the two never drift apart", () => {
    render(<DocsLink href="https://docs.atlas.test/" />);

    const link = screen.getByRole("link", { name: "Docs" });
    for (const cls of sharedClasses) {
      expect(link).toHaveClass(cls);
    }
    expect(link).not.toHaveClass("text-muted-foreground");
  });

  it("carries a focus ring, so tabbing to Docs looks like tabbing to Blog", () => {
    render(<DocsLink href="https://docs.atlas.test/" />);

    const link = screen.getByRole("link", { name: "Docs" });
    expect(link).toHaveClass("focus-visible:ring-3");
    expect(link).toHaveClass("focus-visible:ring-ring/50");
  });

  it("renders nothing when no docs URL is configured", () => {
    const { container } = render(<DocsLink href={null} />);

    expect(container).toBeEmptyDOMElement();
  });

  it("stays a link rather than being relabelled as a button by the Button primitive", () => {
    render(<DocsLink href="https://docs.atlas.test/" />);

    expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Docs" })).not.toBeInTheDocument();
  });
});

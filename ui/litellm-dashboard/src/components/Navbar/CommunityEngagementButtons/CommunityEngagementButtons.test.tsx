import { LifeBuoy } from "lucide-react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { renderWithProviders, screen } from "../../../../tests/test-utils";
import { CommunityEngagementButtons } from "./CommunityEngagementButtons";

let mockUseDisableShowPromptsImpl = () => false;

vi.mock("@/app/(dashboard)/hooks/useDisableShowPrompts", () => ({
  useDisableShowPrompts: () => mockUseDisableShowPromptsImpl(),
}));

const SUPPORT_LINK = {
  href: "https://support.atlas.test/",
  label: "ATLAS Support",
  tooltip: "ATLAS support",
  Icon: LifeBuoy,
};

describe("CommunityEngagementButtons", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseDisableShowPromptsImpl = () => false;
  });

  it("renders each configured link opening in a new tab without leaking the opener", () => {
    renderWithProviders(<CommunityEngagementButtons links={[SUPPORT_LINK]} />);

    const link = screen.getByRole("link", { name: "ATLAS Support" });
    expect(link).toHaveAttribute("href", "https://support.atlas.test/");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders nothing when no links are configured", () => {
    renderWithProviders(<CommunityEngagementButtons links={[]} />);

    expect(screen.queryByRole("group", { name: "Community links" })).not.toBeInTheDocument();
  });

  it("renders nothing when prompts are disabled", () => {
    mockUseDisableShowPromptsImpl = () => true;

    renderWithProviders(<CommunityEngagementButtons links={[SUPPORT_LINK]} />);

    expect(screen.queryByRole("link", { name: "ATLAS Support" })).not.toBeInTheDocument();
  });
});

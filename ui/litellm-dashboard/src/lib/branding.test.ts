import { describe, expect, it } from "vitest";
import { atlasLinksFromSettings } from "./branding";

const BASE_SETTINGS = { PROXY_BASE_URL: "", PROXY_LOGOUT_URL: "" };

describe("atlasLinksFromSettings", () => {
  it("exposes only the ATLAS links whose env vars are set", () => {
    const links = atlasLinksFromSettings({
      ...BASE_SETTINGS,
      ATLAS_DOCS_URL: "https://docs.atlas.test/",
      ATLAS_SUPPORT_URL: null,
      ATLAS_GITHUB_URL: "https://github.test/atlas",
    });

    expect(links.docsUrl).toBe("https://docs.atlas.test/");
    expect(links.communityLinks.map(({ label, href }) => [label, href])).toEqual([
      ["ATLAS on GitHub", "https://github.test/atlas"],
    ]);
  });

  it("returns no links when the proxy sends none", () => {
    expect(atlasLinksFromSettings({ ...BASE_SETTINGS, ATLAS_DOCS_URL: "" })).toEqual({
      docsUrl: null,
      communityLinks: [],
    });
  });
});

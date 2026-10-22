import useAuthorized from "@/app/(dashboard)/hooks/useAuthorized";
import useProxySettings, { type ProxySettings } from "@/app/(dashboard)/hooks/proxySettings/useProxySettings";
import { Github, LifeBuoy, type LucideIcon } from "lucide-react";

export type BrandLink = {
  readonly href: string;
  readonly label: string;
  readonly tooltip: string;
  readonly Icon: LucideIcon;
};

export type AtlasLinks = {
  readonly docsUrl: string | null;
  readonly communityLinks: readonly BrandLink[];
};

export const atlasLinksFromSettings = (settings: ProxySettings): AtlasLinks => ({
  docsUrl: settings.ATLAS_DOCS_URL || null,
  communityLinks: [
    { href: settings.ATLAS_SUPPORT_URL ?? "", label: "ATLAS Support", tooltip: "ATLAS support", Icon: LifeBuoy },
    { href: settings.ATLAS_GITHUB_URL ?? "", label: "ATLAS on GitHub", tooltip: "ATLAS on GitHub", Icon: Github },
  ].filter(({ href }) => href),
});

export const useAtlasLinks = (): AtlasLinks => {
  const { accessToken } = useAuthorized();
  return atlasLinksFromSettings(useProxySettings(accessToken));
};

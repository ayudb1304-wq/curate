import { KitEditor } from "@/components/dashboard/kit-editor";
import { CopyLinkButton } from "@/components/dashboard/copy-link-button";
import { getKitByHandle } from "@/lib/kit/data";
import { getCurrentCreator } from "@/lib/session";

export default async function KitEditorPage() {
  const creator = getCurrentCreator();
  const kit = await getKitByHandle(creator.handle);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-2xl font-semibold tracking-tight">Media kit</h1>
          <p className="text-sm text-muted-foreground">
            Everything brands see at curately.com/{creator.handle}.
          </p>
        </div>
        <CopyLinkButton path={`/${creator.handle}`} label="Copy kit link" />
      </div>

      <KitEditor
        initialBio={kit?.bio ?? ""}
        initialRateCard={kit?.rateCard ?? []}
        initialCollabs={kit?.collabs ?? []}
        initialConnection={
          kit
            ? {
                platform: kit.platform.name,
                username: kit.platform.username,
                syncedAt: kit.metrics?.lastSyncedAt ?? new Date().toISOString(),
              }
            : null
        }
      />
    </>
  );
}

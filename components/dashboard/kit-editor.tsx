"use client";

import { useState } from "react";

import { AtSign, Clapperboard, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { formatDate } from "@/lib/format";
import type { PastCollab, RateCardItem } from "@/lib/kit/types";

function saveLocally() {
  toast.success("Saved for this session", {
    description: "Cloud saving arrives with creator accounts.",
  });
}

interface Connection {
  platform: string;
  username: string;
  syncedAt: string;
}

interface KitEditorProps {
  initialBio: string;
  initialRateCard: RateCardItem[];
  initialCollabs: PastCollab[];
  initialConnection: Connection | null;
}

export function KitEditor({
  initialBio,
  initialRateCard,
  initialCollabs,
  initialConnection,
}: KitEditorProps) {
  const [bio, setBio] = useState(initialBio);
  const [rateCard, setRateCard] = useState(initialRateCard);
  const [collabs, setCollabs] = useState(initialCollabs);
  const [connections, setConnections] = useState<Connection[]>(
    initialConnection ? [initialConnection] : [],
  );

  return (
    <div className="flex flex-col gap-6">
      <ConnectionsCard connections={connections} onConnect={(c) => setConnections((prev) => [...prev, c])} />

      <Card size="sm">
        <CardHeader>
          <CardTitle>Bio</CardTitle>
          <CardDescription>
            Shown at the top of your kit. Say what you make and who follows you.
          </CardDescription>
          <CardAction>
            <Button size="sm" onClick={saveLocally}>
              Save
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Textarea
            value={bio}
            onChange={(event) => setBio(event.target.value)}
            rows={4}
            placeholder="What you create, your niche, and your audience."
          />
        </CardContent>
      </Card>

      <Card size="sm">
        <CardHeader>
          <CardTitle>Rate card</CardTitle>
          <CardDescription>
            Starting prices per deliverable. Brands see these on your kit, labeled self-reported.
          </CardDescription>
          <CardAction>
            <Button size="sm" onClick={saveLocally}>
              Save
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {rateCard.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              {index > 0 && <Separator className="mb-2" />}
              <div className="grid gap-2 sm:grid-cols-[1fr_2fr_8rem_auto]">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`rate-name-${index}`}>Deliverable</Label>
                  <Input
                    id={`rate-name-${index}`}
                    value={item.deliverable}
                    onChange={(event) =>
                      setRateCard((prev) =>
                        prev.map((row, i) =>
                          i === index ? { ...row, deliverable: event.target.value } : row,
                        ),
                      )
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`rate-detail-${index}`}>What's included</Label>
                  <Input
                    id={`rate-detail-${index}`}
                    value={item.detail}
                    onChange={(event) =>
                      setRateCard((prev) =>
                        prev.map((row, i) =>
                          i === index ? { ...row, detail: event.target.value } : row,
                        ),
                      )
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`rate-price-${index}`}>Price (INR)</Label>
                  <Input
                    id={`rate-price-${index}`}
                    type="number"
                    min={0}
                    value={item.price}
                    onChange={(event) =>
                      setRateCard((prev) =>
                        prev.map((row, i) =>
                          i === index ? { ...row, price: Number(event.target.value) } : row,
                        ),
                      )
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="self-end"
                  aria-label={`Remove ${item.deliverable}`}
                  onClick={() => setRateCard((prev) => prev.filter((_, i) => i !== index))}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="self-start"
            onClick={() =>
              setRateCard((prev) => [
                ...prev,
                { deliverable: "", detail: "", price: 0, currency: "INR" },
              ])
            }
          >
            <Plus data-icon="inline-start" />
            Add deliverable
          </Button>
        </CardContent>
      </Card>

      <Card size="sm">
        <CardHeader>
          <CardTitle>Past collaborations</CardTitle>
          <CardDescription>
            Brands you have worked with and one line on what you delivered.
          </CardDescription>
          <CardAction>
            <Button size="sm" onClick={saveLocally}>
              Save
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {collabs.map((collab, index) => (
            <div key={index} className="flex flex-col gap-2">
              {index > 0 && <Separator className="mb-2" />}
              <div className="grid gap-2 sm:grid-cols-[1fr_2fr_auto]">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`collab-brand-${index}`}>Brand</Label>
                  <Input
                    id={`collab-brand-${index}`}
                    value={collab.brand}
                    onChange={(event) =>
                      setCollabs((prev) =>
                        prev.map((row, i) =>
                          i === index ? { ...row, brand: event.target.value } : row,
                        ),
                      )
                    }
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor={`collab-summary-${index}`}>Summary</Label>
                  <Input
                    id={`collab-summary-${index}`}
                    value={collab.summary}
                    onChange={(event) =>
                      setCollabs((prev) =>
                        prev.map((row, i) =>
                          i === index ? { ...row, summary: event.target.value } : row,
                        ),
                      )
                    }
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="self-end"
                  aria-label={`Remove ${collab.brand}`}
                  onClick={() => setCollabs((prev) => prev.filter((_, i) => i !== index))}
                >
                  <Trash2 />
                </Button>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            className="self-start"
            onClick={() => setCollabs((prev) => [...prev, { brand: "", summary: "" }])}
          >
            <Plus data-icon="inline-start" />
            Add collaboration
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

const PLATFORMS = [
  { key: "instagram", name: "Instagram", icon: AtSign, username: "aanya.beauty" },
  { key: "youtube", name: "YouTube", icon: Clapperboard, username: "AanyaSharma" },
];

function ConnectionsCard({
  connections,
  onConnect,
}: {
  connections: Connection[];
  onConnect: (connection: Connection) => void;
}) {
  const [open, setOpen] = useState(false);
  const [connecting, setConnecting] = useState<string | null>(null);

  const connectedNames = new Set(connections.map((c) => c.platform));

  // Simulates the Phyllo Connect popup; replaced by the real SDK once sandbox access lands.
  const connect = (platform: (typeof PLATFORMS)[number]) => {
    setConnecting(platform.key);
    setTimeout(() => {
      onConnect({
        platform: platform.name,
        username: platform.username,
        syncedAt: new Date().toISOString(),
      });
      setConnecting(null);
      setOpen(false);
      toast.success(`${platform.name} connected`, {
        description: "Demo connection. Live account data arrives with sandbox access.",
      });
    }, 1500);
  };

  return (
    <Card size="sm">
      <CardHeader>
        <CardTitle>Connected accounts</CardTitle>
        <CardDescription>
          Connected accounts power the live metrics on your kit.
        </CardDescription>
        <CardAction>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Plus data-icon="inline-start" />
                Connect platform
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
              <DialogHeader>
                <DialogTitle>Connect a platform</DialogTitle>
                <DialogDescription>
                  You log in on the platform itself; Curately only receives the
                  stats you approve. This demo simulates that flow.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-2">
                {PLATFORMS.map((platform) => (
                  <Button
                    key={platform.key}
                    variant="outline"
                    disabled={connectedNames.has(platform.name) || connecting !== null}
                    onClick={() => connect(platform)}
                    className="justify-start"
                  >
                    {connecting === platform.key ? (
                      <Loader2 data-icon="inline-start" className="animate-spin" />
                    ) : (
                      <platform.icon data-icon="inline-start" />
                    )}
                    {connectedNames.has(platform.name)
                      ? `${platform.name} connected`
                      : `Connect ${platform.name}`}
                  </Button>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        {connections.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            Nothing connected yet. Connect your main platform to make your kit live.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {connections.map((connection) => (
              <li key={connection.platform} className="flex items-center gap-2 text-sm">
                <Badge variant="secondary">{connection.platform}</Badge>
                <span>@{connection.username}</span>
                <span className="ml-auto text-xs text-muted-foreground">
                  Synced {formatDate(connection.syncedAt)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

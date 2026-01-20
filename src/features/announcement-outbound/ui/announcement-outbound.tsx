"use client";

import { postOutboundLog } from "@/src/features/announcement-outbound";
import { useEffect } from "react";

export function AnnouncementOutbound({
  announcementId,
}: {
  announcementId: number;
}) {
  useEffect(() => {
    postOutboundLog(announcementId).catch((err) =>
      console.error("Failed to post view log:", err),
    );
  }, [announcementId]);

  return null;
}

"use client";

import { useUser } from "@/src/entities/user";
import { postOutboundLog } from "@/src/features/announcement-outbound";
import { useEffect } from "react";

export function AnnouncementOutbound({
  announcementId,
}: {
  announcementId: number;
}) {
  const { isLoggedIn } = useUser();
  useEffect(() => {
    if (isLoggedIn) {
      postOutboundLog(announcementId).catch((err) =>
        console.error("Failed to post view log:", err),
      );
    }
  }, [announcementId, isLoggedIn]);

  return null;
}

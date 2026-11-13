"use client";

import React, { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import DailyIframe from "@daily-co/daily-js";
import {
  Video,
  Mic,
  MicOff,
  VideoOff,
  PhoneOff,
  Wifi,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

export default function VideoConsultationRoomPage() {
  const { appointmentId } = useParams<{ appointmentId: string }>();
  const [roomState, setRoomState] = useState<
    "CHECKING" | "WAITING_ROOM" | "IN_CALL" | "ENDED" | "ERROR"
  >("CHECKING");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sessionInfo, setSessionInfo] = useState<any>(null);
  const [camEnabled, setCamEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);

  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const callContainerRef = useRef<HTMLDivElement | null>(null);
  const callObjectRef = useRef<any>(null);

  useEffect(() => {
    setOnlineStatus(navigator.onLine);
    const handleOnline = () => setOnlineStatus(true);
    const handleOffline = () => setOnlineStatus(false);
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    async function verifyAccessAndSetupPreview() {
      const res = await fetch("/api/video/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appointmentId }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || "Unauthorized access to consultation room");
        setRoomState("ERROR");
        return;
      }
      setSessionInfo(data);
      setRoomState("WAITING_ROOM");

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (previewVideoRef.current) {
          previewVideoRef.current.srcObject = stream;
        }
      } catch {
        // User can still join even if camera permission is toggled later
      }
    }

    verifyAccessAndSetupPreview();

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      if (callObjectRef.current) {
        callObjectRef.current.destroy();
      }
    };
  }, [appointmentId]);

  const enterLiveConsultation = async () => {
    if (!sessionInfo || !callContainerRef.current) return;
    setRoomState("IN_CALL");

    const callFrame = DailyIframe.createFrame(callContainerRef.current, {
      iframeStyle: {
        width: "100%",
        height: "600px",
        border: "0",
        borderRadius: "20px",
      },
      showLeaveButton: true,
      showFullscreenButton: true,
    });

    callObjectRef.current = callFrame;

    await callFrame.join({
      url: sessionInfo.roomUrl,
      token: sessionInfo.token,
    });

    callFrame.on("left-meeting", () => {
      setRoomState("ENDED");
    });
  };

  if (roomState === "ERROR") {
    return (
      <div className="mx-auto max-w-xl p-10 text-center">
        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-800">
          {errorMsg}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-primary px-6 py-4 text-white">
        <div>
          <span className="text-xs uppercase tracking-wider text-brand-accent font-semibold">
            Encrypted Telemedicine Suite
          </span>
          <h1 className="text-xl font-bold">
            Consultation with Dr. Nitu Rajpoot, BDS
          </h1>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1">
            <Wifi className="h-3.5 w-3.5 text-brand-accent" />
            {onlineStatus ? "Connection Stable" : "Reconnecting..."}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent/20 px-3 py-1 text-brand-accent">
            <ShieldCheck className="h-3.5 w-3.5" /> Token Verified
          </span>
        </div>
      </div>

      {roomState === "WAITING_ROOM" && (
        <div className="grid gap-8 rounded-3xl border border-brand-secondary bg-white p-8 shadow-card md:grid-cols-12">
          <div className="md:col-span-7 space-y-4">
            <div className="relative overflow-hidden rounded-2xl bg-brand-text aspect-video flex items-center justify-center">
              <video
                ref={previewVideoRef}
                autoPlay
                muted
                playsInline
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setMicEnabled(!micEnabled)}
                  className="rounded-full bg-white/90 p-3 text-brand-primary shadow"
                >
                  {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4 text-red-600" />}
                </button>
                <button
                  type="button"
                  onClick={() => setCamEnabled(!camEnabled)}
                  className="rounded-full bg-white/90 p-3 text-brand-primary shadow"
                >
                  {camEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4 text-red-600" />}
                </button>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-secondary px-3 py-1 text-xs font-bold text-brand-primary">
                Virtual Waiting Room
              </span>
              <h2 className="text-2xl font-bold text-brand-primary">
                Your doctor will join shortly.
              </h2>
              <p className="text-xs text-brand-text/75 leading-relaxed">
                Please verify your camera preview and microphone permissions
                before entering the consultation room. Video and audio are never
                recorded without explicit clinical consent.
              </p>
            </div>

            <button
              onClick={enterLiveConsultation}
              className="w-full rounded-2xl bg-brand-accent py-4 text-sm font-bold text-white shadow-elevated hover:bg-brand-accent/90 transition"
            >
              Enter Encrypted Video Room
            </button>
          </div>
        </div>
      )}

      <div
        ref={callContainerRef}
        className={roomState === "IN_CALL" ? "block" : "hidden"}
      />
    </div>
  );
}
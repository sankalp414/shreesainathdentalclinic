const DAILY_API_URL = "https://api.daily.co/v1";

export async function provisionDailyRoom(appointmentId: string) {
  const roomName = `ssd-consult-${appointmentId.slice(0, 12)}`;
  const apiKey = process.env.DAILY_API_KEY;
  const domain = process.env.NEXT_PUBLIC_DAILY_DOMAIN || "shree-sainath-dental.daily.co";

  if (!apiKey) {
    return {
      name: roomName,
      url: `https://${domain}/${roomName}`,
    };
  }

  const expSeconds = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7; // 7 days validity

  const res = await fetch(`${DAILY_API_URL}/rooms`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: roomName,
      privacy: "private",
      properties: {
        exp: expSeconds,
        enable_chat: true,
        enable_screenshare: true,
        start_video_off: false,
        start_audio_off: false,
      },
    }),
  });

  if (!res.ok) {
    return { name: roomName, url: `https://${domain}/${roomName}` };
  }

  const data = await res.json();
  return { name: data.name as string, url: data.url as string };
}

export async function createDailyMeetingToken({
  roomName,
  userName,
  isOwner,
}: {
  roomName: string;
  userName: string;
  isOwner: boolean;
}) {
  const apiKey = process.env.DAILY_API_KEY;
  if (!apiKey) {
    return `dev_token_${roomName}_${isOwner ? "doctor" : "patient"}`;
  }

  const exp = Math.floor(Date.now() / 1000) + 60 * 90; // 90-minute token expiration

  const res = await fetch(`${DAILY_API_URL}/meeting-tokens`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      properties: {
        room_name: roomName,
        user_name: userName,
        is_owner: isOwner,
        exp,
      },
    }),
  });

  const data = await res.json();
  return data.token as string;
}
import { HandHeart, Handshake, Heart, Mic, Music, Sparkles } from "lucide-react";

const icons = { hands: HandHeart, handshake: Handshake, sparkles: Sparkles, music: Music, mic: Mic, heart: Heart };

export function InvolvementIcon({ name, className = "size-5" }: { name: keyof typeof icons; className?: string }) {
  const Icon = icons[name];
  return <Icon className={className} />;
}

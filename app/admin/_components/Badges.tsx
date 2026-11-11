import { CHANNEL_STYLES, STATUS_LABELS, STATUS_STYLES } from "./format";

export function ChannelBadge({ channel }: { channel: string | null }) {
  const c = channel || "Direct";
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
        CHANNEL_STYLES[c] || CHANNEL_STYLES.Direct
      }`}
    >
      {c}
    </span>
  );
}

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset ${
        STATUS_STYLES[status] || STATUS_STYLES.new
      }`}
    >
      {STATUS_LABELS[status] || status}
    </span>
  );
}

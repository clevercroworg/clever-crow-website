// Prevents a single word from sitting alone on the last line of a heading by gluing the last words
// together with non-breaking spaces: the last two words, or the last three when the penultimate is "&"
// (so "Ads & Reels" stays together). Short titles that need two lines then break as "Social / Media Management".
export function noOrphan(text: string) {
  const words = text.split(" ");
  if (words.length < 3) return text;
  const keep = words[words.length - 2] === "&" && words.length > 3 ? 3 : 2;
  return `${words.slice(0, -keep).join(" ")} ${words.slice(-keep).join(" ")}`;
}

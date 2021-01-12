const CategoryListTypeA = [
  { emoji: "🐶 ", name: "자유롭게멍멍" },
  { emoji: "🏎 ", name: "애마자랑" },
  { emoji: "🔫 ", name: "나때는군대" },
  { emoji: "📈 ", name: "주식투자" },
  { emoji: "🚘 ", name: "시승후기" },
  { emoji: "✈️ ", name: "여행먹방" },
  { emoji: "💼 ", name: "보험후기" },
  { emoji: "🚓️ ", name: "사고후기" },
  { emoji: "👰🏻 ‍", name: "결혼이야기" },
  { emoji: "🚗 ", name: "차Q&A" },
];

// list of items
const CategoryListTypeB = [
  { name: "👑 오늘 이 글 잘나가네" },
  { name: "🐶 자유롭게멍멍" },
  { name: "🏎 애마자랑" },
  { name: "🔫 나때는군대" },
  { name: "📈 주식투자" },
  { name: "🚘 시승후기" },
  { name: "✈️ 여행먹방" },
  { name: "💼 보험후기" },
  { name: "🚓️ 사고후기" },
  { name: "👰🏻‍♀️ 결혼이야기" },
  { name: "🚗 차Q&A" },
];

const removeEmojis = (str) => {
  const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return str.replace(regex, "");
};

export { CategoryListTypeA, CategoryListTypeB, removeEmojis };

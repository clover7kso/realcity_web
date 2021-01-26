const CategoryListTypeA = [
  { emoji: "🤣 ", name: "유머게시판" },
  { emoji: "⚽️ ", name: "해외축구" },
  { emoji: "📈 ", name: "주식투자" },
  { emoji: "🎮 ", name: "게임" },
  { emoji: "💸 ", name: "비트코인" },
  { emoji: "🖋 ", name: "만화/애니" },
  { emoji: "📹 ", name: "인터넷방송" },
  { emoji: "🔫 ", name: "나때는군대" },
  { emoji: "🛩 ", name: "여행먹방" },
  { emoji: "🐶 ", name: "자유게시판" },
];

// list of items
const CategoryListTypeB = [
  { name: "👑 오늘인기글" },
  { name: "🤣 유머게시판" },
  { name: "⚽️ 해외축구" },
  { name: "📈 주식투자" },
  { name: "🎮 게임" },
  { name: "💸 비트코인" },
  { name: "🖋 만화/애니" },
  { name: "📹 인터넷방송" },
  { name: "🔫 나때는군대" },
  { name: "🛩 여행먹방" },
  { name: "🐶 자유게시판" },
];

const CategoryListTypeC = [
  { name: "🤣 유머게시판", key: "유머게시판" },
  { name: "⚽️ 해외축구", key: "해외축구" },
  { name: "📈 주식투자", key: "주식투자" },
  { name: "🎮 게임", key: "게임" },
  { name: "💸 비트코인", key: "비트코인" },
  { name: "🖋 만화/애니", key: "만화/애니" },
  { name: "📹 인터넷방송", key: "인터넷방송" },
  { name: "🔫 나때는군대", key: "나때는군대" },
  { name: "🛩 여행먹방", key: "여행먹방" },
  { name: "🐶 자유게시판", key: "자유게시판" },
];

const removeEmojis = (str) => {
  const regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
  return str.replace(regex, "").replace(" ", "");
};

const getImages = (data) => {
  var m,
    urls = [],
    // eslint-disable-next-line no-useless-escape
    rex = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g;

  while ((m = rex.exec(data))) {
    urls.push(m[1]);
  }

  return urls;
};

const getIp = async () => {
  const publicIp = require("public-ip");
  const ip = await publicIp.v4();
  const splitResult = ip.split(".");
  const result = splitResult[0] + "." + splitResult[1];
  return result;
};

const getFullIp = async () => {
  const publicIp = require("public-ip");
  const ip = await publicIp.v4();
  return ip;
};

const checkValidate = (data, alert) => {
  alert.removeAll();

  var result = true;
  for (var i = 0; i < data.length; i++) {
    if (
      data[i].key === undefined ||
      data[i].key === null ||
      data[i].key === ""
    ) {
      alert.error(data[i].tagNull);
      result = false;
    } else if (
      data[i].regex !== undefined &&
      !data[i].regex.test(data[i].key)
    ) {
      alert.error(data[i].tagRegex);
      result = false;
    }
  }
  return result;
};

const getLevel = (point) => {
  return Math.floor(Math.sqrt(point) / 4);
};

const getPercentage = (point) => {
  return (Math.sqrt(point) / 4 - Math.floor(Math.sqrt(point) / 4)) * 100;
};

const getRemain = (point) => {
  return (getLevel(point) + 1) * 4 * (getLevel(point) + 1) * 4 - point;
};

export {
  CategoryListTypeA,
  CategoryListTypeB,
  CategoryListTypeC,
  removeEmojis,
  getImages,
  getIp,
  getFullIp,
  checkValidate,
  getLevel,
  getPercentage,
  getRemain,
};

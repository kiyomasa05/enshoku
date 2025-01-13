export const translateSkillCate = (category: string) => {
  switch (category) {
    case "language":
      return "言語";
    case "FW":
      return "フレームワーク";
    case "infra":
      return "インフラ";
    case "other":
      return "その他";
    default:
      return "";
  }
};

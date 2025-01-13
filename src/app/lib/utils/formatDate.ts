
/**
 * 2024-12 のような文字を2024年12月にします
 * @param dateString 
 * @returns 
 */
export const formatDate = (dateString: string) => {
  const [year, month] = dateString.split("-");
  return `${year}年${month}月`;
};

/**
 * スタート月、終了月を受け取り期間を計算する
 * @param start 2025-01
 * @param end 2026-04
 * @returns 
 */
export const calculatePeriod = (start: string, end: string) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diffYears = endDate.getFullYear() - startDate.getFullYear();
  const diffMonths = endDate.getMonth() - startDate.getMonth();
  const totalMonths = diffYears * 12 + diffMonths;

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;

  return years > 0 ? `${years}年${months}ヶ月` : `${months}ヶ月`;
};

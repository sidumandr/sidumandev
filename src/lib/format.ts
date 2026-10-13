export const twoDigits = (value: number): string => String(value).padStart(2, "0");
export function projectSlug(title: string): string {
  return title.toLocaleLowerCase("tr-TR").replaceAll("ı", "i").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

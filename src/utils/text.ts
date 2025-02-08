export const createLabel = (text: string) => {
  return text
    .split(" ")
    .map((tex) => tex[0].toUpperCase() + tex.slice(1).toLocaleLowerCase())
    .join(" ")
    .split("_")
    .map((tex) => tex[0].toUpperCase() + tex.slice(1).toLocaleLowerCase())
    .join(" ")
    .split("-")
    .map((tex) => tex[0].toUpperCase() + tex.slice(1).toLocaleLowerCase())
    .join("-");
};

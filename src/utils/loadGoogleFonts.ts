export const loadGoogleFont = (fontName: string) => {
  const formattedName = fontName.replace(" ", "+");
  const linkId = "google-font";
  if (!document.getElementById(linkId)) {
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${formattedName}:wght@400;700&display=swap`;
    document.head.appendChild(link);
  }
};

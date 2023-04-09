export function getCookie(name: string): string {
  const matches = document
    ? document.cookie.match(
        new RegExp("(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)")
      )
    : false;

  return matches ? decodeURIComponent(matches[1]) : "";
}

export function getCookie(name: string) {
  if (document.cookie.length !== 0) {
    var array = document.cookie.split("=");
    return array[1];
  } else {
    return false;
  }
}

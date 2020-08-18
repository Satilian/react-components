export const passwordRegexp = new RegExp(
  /^((?=.*[a-z])(?=.*[A-Z])(?=.*\d))[^#$^+=!*()@%&]{8,64}$/i
);
export const emailRegexp = new RegExp(/^[\w.!#$%&'*+/=?^`{|}~-]{2,}@[\w.-]+\.[A-Z]{2,}$/i);
export const onlyLat = new RegExp(/^[a-zA-Z]{2,30}$/i);
export const phoneRegexp = new RegExp(/^\d{11}$/i);
export const tagsRegexp = new RegExp(/<\/?[^>]+>/g);
export const youtubeId = new RegExp(
  /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})\W/i
);
export const youtubeShareRegexp = new RegExp(/https:\/\/youtu.be\/\w{11}/i);
export const linkTagRegexp = new RegExp(
  /<a[^>]+?href=["\'](?!mailto)([^>]*?)["\']([^>]*?)>(.*?)<\/a>/gi
);

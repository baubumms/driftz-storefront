export const indexedObjToArray = (obj) => {
  try{
    return Object.keys(obj).map((k) => {
        return obj[k];
      });
  }catch {
    return null;
  }
}
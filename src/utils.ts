// @eslint ignore-file
export const multiArrayContainsArray = (arrays:any, array:any) => arrays.some((a:any) => {
  return (a.length > array.length ? a : array).every((_:any, i:any) => a[i] === array[i]);
})

export function randomIntFromInterval(min:any, max:any) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function uuidv4() {
  // @ts-ignore-next-line
  return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
  // @ts-ignore-next-line
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  );
}
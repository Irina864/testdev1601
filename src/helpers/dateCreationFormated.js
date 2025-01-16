export const dateCreationFormat = (date) => {
   const day = date.getDate();
   let x = date.getMonth()+1;
   let month = 0;
   if (x > 10) month = x;
   if (x < 10) month = `0${x}`
   const year = date.getFullYear();
return `Опубликовано ${day}. ${month}. ${year}`
}
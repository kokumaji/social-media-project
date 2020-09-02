const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const getMonthYear = (date: Date) => {
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
};

export const getReadableCount = (number: number) => {
  if(number.toString().length < 4) return number;
  if(number.toString().length < 7) return `${Math.round((number/1000) * 100) / 100}K`;
  if(number.toString().length < 10) return `${Math.round((number/1000000) * 100) / 100}M`;
};

export const getReadableDifference = (oldDate: number) => {
  var delta = Math.abs(Date.now() - oldDate) /1000;
  console.log(delta);

  if(delta > 31536000) return new String(Math.floor((delta / 604800) / 52 )) + 'y';

  if(delta > 604800) return new String(Math.floor((delta / 86400) / 7 ) + 'w'); 

  //return the amount of days
  if(delta > 86400) return new String(Math.floor(delta / 86400) + 'd');
  
  //return the amount of hours if more than 60min ago
  if(delta > 3600) return new String(Math.floor(delta / 3600) % 24 + 'h');
  
  //return the amount of minutes
  if(delta >  59) return new String(Math.floor(delta / 60) % 60 + 'm');

  return new String(Math.floor(delta) + 's');
} 
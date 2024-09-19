import moment from 'moment';

export function getMonthDays(month: number, year: number): { day: string; dayLong: string; date: number }[] {
  const startDate = moment(`${year}-${month.toString().padStart(2, '0')}-01`);
  const endDate = moment(startDate).endOf('month');

  const daysOfMonth: { day: string; dayLong: string; date: number }[] = [];

  while (startDate.isSameOrBefore(endDate, 'day')) {
    const day = startDate.format('ddd');
    const dayLong = startDate.format('dddd'); // Add dayLong property
    const date = startDate.date();
    daysOfMonth.push({ day, dayLong, date }); // Include dayLong property in the object
    startDate.add(1, 'day');
  }

  return daysOfMonth;
}

export function getYearMonths(year: number): { month: string; shortName: string; value: number }[] {
    const months: { month: string; shortName: string; value: number }[] = [];
    for (let month = 0; month < 12; month++) {
      const monthObj = {
        month: new Date(year, month).toLocaleString('default', { month: 'long' }),
        shortName: new Date(year, month).toLocaleString('default', { month: 'short' }),
        value: month + 1
      };
      months.push(monthObj);
    }
    return months;
  }

  export function convertToDate(dateString: string): Date {
    const parts = dateString.split(' ');
    const day = parseInt(parts[0]);
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(parts[1]);
    const year = parseInt(parts[2]);
    return new Date(year, month, day);
  }

  export function formatDate(timestampInSeconds: number): string {
    const timestampInMillis = timestampInSeconds * 1000; // Convert seconds to milliseconds
    const date = new Date(timestampInMillis);
  
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
  
    return date.toLocaleString('en-US', options);
  }

  export function convertDateStringToDate(dateString: string): Date {
    const months: { [key: string]: number } = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
      Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
    };
  
    // Split the input date string by comma and space to extract individual components.
    const [, month, dayNumber, year] = dateString?.split(' ');
  
    // Convert the month name to its corresponding numeric value using the months object.
    const monthIndex = months[month];
  
    // Create the Date object using the components.
    const dateObject = new Date(parseInt(year), monthIndex, parseInt(dayNumber));
  
    return dateObject;
  }
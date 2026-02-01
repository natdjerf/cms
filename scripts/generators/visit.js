/**
 * Generate visit status text based on home page data
 */
export const generateVisitStatus = (homeData) => {
  const { hours, open_for_the_season, seasons_open } = homeData;
  
  if (open_for_the_season) {
    return seasons_open 
      ? `Now open for our ${seasons_open} season! We will be open every day ${hours}`
      : `Now open! We will be open every day ${hours}`;
  }
  return 'We are closed for the season';
};

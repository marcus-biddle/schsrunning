import { fetchAthletes } from "../athletes";


// Example usage in your cron job
async function myCronJob() {
  try {
    const data = await fetchAthletes();
    console.log('Fetched data:', data);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Call your cron job function
myCronJob();
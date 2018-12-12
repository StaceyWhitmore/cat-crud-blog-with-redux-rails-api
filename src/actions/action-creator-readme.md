Instead of junking up the action creator with code related for making API calls,
 I abstract away API interactions into a helper module (`/api/catApi`)


 our reducer should return a brand-NEW object,
 with Copies of any objects it needs from the previous state,
 and NEVER alter the previous state

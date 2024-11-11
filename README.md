# fusmani-assignment

## How to run

### Front end

1. Add a .env file with BPORT for back end port and FPORT for front end port. Without this .env file, the application will run on default pre-specified ports i.e. 3333 for the backend and 3000 for the front end
2. `cd frontend && npm i && npm run dev`

### Back end

1. Add a .env.local file with NEXT_PUBLIC_API_URL as the base api url. Note that the url is the localhost with the backend port specified in the previous step appended with a "/issue".
2. `cd backend && npm i && npm run start:dev`

Finally, navigate to the localhost appended with the front end port specified in a previous step

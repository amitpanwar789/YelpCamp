# YelpCamp

![campground](https://user-images.githubusercontent.com/64302444/201523970-43f5b0dd-6e0d-4612-9dbd-4e12168a34dd.png)


![Screenshot from 2022-11-13 18-50-08](https://user-images.githubusercontent.com/64302444/201523982-19d064f1-e866-4514-b57f-70796357cf84.png)


![Screenshot from 2022-11-13 18-47-59](https://user-images.githubusercontent.com/64302444/201523980-fcc47834-d4e9-4d17-8b87-cea8c1260e3d.png)


YelpCamp is a website where users can create and review campgrounds. In order to review or create a campground, you must have an account. This project was part of Colt Steele's web dev course on udemy.  

This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication.  

## Features
* Users can create, edit, and remove campgrounds
* Users can review campgrounds once, and edit or remove their review

## Run it locally
1. Install [mongodb](https://www.mongodb.com/)
2. Create a cloudinary account to get an API key and secret code

```
git clone https://github.com/himanshup/yelpcamp.git
cd yelpcamp
npm install
```

Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  

```
DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
```

Run ```mongod``` in another terminal and ```node app.js``` in the terminal with the project.  

Then go to [localhost:3000](http://localhost:3000/).

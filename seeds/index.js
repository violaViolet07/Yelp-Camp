const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
const Campground = require('../models/campground');


mongoose.connect('mongodb+srv://firstUser:48EAYu3qnkPGb0Ph@clustervio.1ncrqtf.mongodb.net/?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
}

const seedDB = async () => {
    await Campground.deleteMany({ });
    for (let i = 0; i < 300; i++) {

        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '659d786c9d82fd1a9e5ec4f8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            //image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',

            geometry: {
                type: "Point",
                coordinates: [cities[random1000].longitude,
                cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dleocqn2w/image/upload/v1706198382/YelpCamp/c8mjrgmjzwoglipz6yia.jpg',


                    filename: 'YelpCamp/c8mjrgmjzwoglipz6yia',



                },

                {
                    url: 'https://res.cloudinary.com/dleocqn2w/image/upload/v1705152260/YelpCamp/xgercp8rvbvbzca6lcot.jpg',
                    filename: 'YelpCamp/xgercp8rvbvbzca6lcot'
                }

            ]
        })
        await camp.save();
    }
}

seedDB();

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.eey3bcc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();


    const gardenersCollection = client.db("gardenDB").collection("gardeners");


    const gardeners = [
      {
        name: "Rahim Ahmed",
        age: 28,
        gender: "Male",
        status: "Active",
        experiences: "5 years in organic farming",
        image: "https://i.ibb.co/rRwM6JQn/profile-1.jpg",
        totalSharedTips: 12
      },
      {
        name: "Salma Khatun",
        age: 26,
        gender: "Female",
        status: "Inactive",
        experiences: "3 years in organic farming",
        image: "https://i.ibb.co/b5Y2Rt7k/profile-3.jpg",
        totalSharedTips: 5
      },
      {
        name: "Jamal Uddin",
        age: 32,
        gender: "Male",
        status: "Active",
        experiences: "7 years in organic farming",
        image: "https://i.ibb.co/jd4P0Lm/profile-2.jpg",
        totalSharedTips: 20
      },
      {
        name: "Fatema Begum",
        age: 29,
        gender: "Female",
        status: "Active",
        experiences: "4 years in organic farming",
        image: "https://i.ibb.co/WNQWMpPT/profile-4.jpg",
        totalSharedTips: 8
      },
      {
        name: "Kamal Hossain",
        age: 30,
        gender: "Male",
        status: "Inactive",
        experiences: "6 years in organic farming",
        image: "https://i.ibb.co/0y67NLSM/profile-6.jpg",
        totalSharedTips: 15
      },
      {
        name: "Nadia Akter",
        age: 27,
        gender: "Female",
        status: "Active",
        experiences: "2 years in organic farming",
        image: "https://i.ibb.co/4rxh0Dj/profile-5.jpg",
        totalSharedTips: 7
      },
      {
        name: "Rafiq Alam",
        age: 31,
        gender: "Male",
        status: "Active",
        experiences: "5 years in organic farming",
        image: "https://i.ibb.co/YBTkVLHH/profile-9.jpg",
        totalSharedTips: 10
      },
      {
        name: "Moushumi Rahman",
        age: 28,
        gender: "Female",
        status: "Inactive",
        experiences: "3 years in organic farming",
        image: "https://i.ibb.co/TDgQgYZ2/profile-7.jpg",
        totalSharedTips: 6
      },
      {
        name: "Shahidul Islam",
        age: 29,
        gender: "Male",
        status: "Active",
        experiences: "4 years in organic farming",
        image: "https://i.ibb.co.com/1tn93ckk/profile-8.jpg",
        totalSharedTips: 9
      },
      {
        name: "Rohan Ahmed",
        age: 30,
        gender: "Male",
        status: "Inactive",
        experiences: "6 years in organic farming",
        image: "https://i.ibb.co/bM0WVcSm/profile-10.jpg",
        totalSharedTips: 11
      }
    ];

    const count = await gardenersCollection.countDocuments();
    if (count === 0) {
      const result = await gardenersCollection.insertMany(gardeners);
      console.log(`${result.insertedCount} gardeners inserted`);

    }

    app.get('/gardeners', async (req, res) => {
      const result = await gardenersCollection.find().toArray();
      res.send(result);
    });

    app.get('/gardeners/:id', async (req, res) => {
      const id = req.params.id;
      const gardener = await gardenersCollection.findOne({ _id: new ObjectId(id) });
      res.send(gardener);
    });







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('assignment 10 is running')
});

app.listen(port, () => {
  console.log(`assignment ten server is running on port ${port}`);

})

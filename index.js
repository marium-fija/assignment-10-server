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

    const usersCollection = client.db("gardenDB").collection("users");

    const tipsCollection = client.db("gardenDB").collection("tips");



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


    // tips releted APIs

    const tips = [
  {
    title: "How I Grow Tomatoes Indoors",
    plantType: "Tomato",
    difficulty: "Easy",
    description: "I use pots and indoor lighting to grow juicy tomatoes at home.",
    image: "https://i.ibb.co/tpcxTbbq/Tomato.jpg",
    category: "Plant Care",
    availability: "Public",
    user: { email: "fija@example.com", name: "Fija" },
    trending: true
  },
  {
    title: "Indoor Basil Growth Tips",
    plantType: "Basil",
    difficulty: "Medium",
    description: "Grow aromatic basil indoors with proper sunlight and watering.",
    image: "https://i.ibb.co/1GtF1rFL/Basil.jpg",
    category: "Herbs",
    availability: "Public",
    user: { email: "rahim@example.com", name: "Rahim" },
    trending: true
  },
  {
    title: "Vertical Strawberry Gardening",
    plantType: "Strawberry",
    difficulty: "Medium",
    description: "Use vertical planters to save space and grow strawberries.",
    image: "https://i.ibb.co/ynSvSZv1/Strawberry.jpg",
    category: "Vertical Gardening",
    availability: "Public",
    user: { email: "salma@example.com", name: "Salma" },
    trending: true
  },
  {
    title: "Organic Carrot Farming",
    plantType: "Carrot",
    difficulty: "Hard",
    description: "Tips to grow sweet carrots organically in your backyard.",
    image: "https://i.ibb.co/rGMxJ8T3/Carrot.jpg",
    category: "Composting",
    availability: "Public",
    user: { email: "jamal@example.com", name: "Jamal" },
    trending: true
  },
  {
    title: "Growing Roses in Pots",
    plantType: "Rose",
    difficulty: "Medium",
    description: "Beautiful roses can bloom in small pots with proper care.",
    image: "https://i.ibb.co/hFzGKWMx/Rose.jpg",
    category: "Flower Care",
    availability: "Public",
    user: { email: "fatema@example.com", name: "Fatema" },
    trending: true
  },
  {
    title: "Quick Lettuce Harvest",
    plantType: "Lettuce",
    difficulty: "Easy",
    description: "Learn to grow and harvest lettuce quickly in containers.",
    image: "https://i.ibb.co/60BmqyXR/Lettuce.jpg",
    category: "Plant Care",
    availability: "Public",
    user: { email: "kamal@example.com", name: "Kamal" },
    trending: true
  },
  {
    title: "Cucumber Trellis Tips",
    plantType: "Cucumber",
    difficulty: "Medium",
    description: "Support your cucumber plants with trellis for better yield.",
    image: "https://i.ibb.co/GQb5KVCP/cucumber.jpg",
    category: "Vertical Gardening",
    availability: "Public",
    user: { email: "nadia@example.com", name: "Nadia" },
    trending: false
  },
  {
    title: "Sunflower Backyard Guide",
    plantType: "Sunflower",
    difficulty: "Easy",
    description: "Grow tall sunflowers in your backyard easily.",
    image: "https://i.ibb.co/BVwCGd0J/sunflower.jpg",
    category: "Flower Care",
    availability: "Public",
    user: { email: "rafiq@example.com", name: "Rafiq" },
    trending: false
  }
];

const count2 = await tipsCollection.countDocuments();
if (count2 === 0) {
  const result = await tipsCollection.insertMany(tips);
  console.log(`${result.insertedCount} tips inserted`);
}

app.get('/tips/trending', async (req, res) => {
   const trendingTips = await tipsCollection.find({trending: true}).limit(6).toArray();
  res.send(trendingTips);
});

app.get('/tips', async (req, res) => {
  const result = await tipsCollection.find().toArray();
  res.send(result);
});

app.get('/tips/:id', async (req, res) => {
  const id = req.params.id;
  const tip = await tipsCollection.findOne({_id: new ObjectId(id) });
  res.send(tip);
});

app.post("/tips", async (req, res) =>{
  const tip =req.body;
  const result = await tipsCollection.insertOne(tip);
  res.send(result);
});


// My tips releted APIs

app.get('/tips', async (req, res) => {
  const email = req.query.email;
  let query = {};
  if (email) {
    query = {"user.email": email };
  }
  const result = await tipsCollection.find(query).toArray();
  res.send(result);
});

app.get("/tips/:id", async (req, res) => {
  const id =req.params.id;
  const result =await tipsCollection.findOne({_id: new ObjectId(id) });
  res.send(result);
});

app.delete("/tips/:id", async (req, res) => {
  const id = req.params.id;
  const result = await tipsCollection.deleteOne({_id: new ObjectId(id) });
  res.send(result);
});

app.put("/tips/:id", async (req, res) => {
  const id = req.params.id;
  const updatedTip = req.body;
  const result = await tipsCollection.updateOne(
    {_id : new ObjectId(id) },
    { $set : updatedTip}
  );
  res.send(result);
});

    // Users releted APIs

    app.get('/users', async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    })

    app.post('/users', async (req, res) => {
      const userProfile = req.body;
      const result = await usersCollection.insertOne(userProfile);
      res.send(result);
    })

    app.patch('/users', async (req, res) => {
      const {email, lastSignInTime} = req.body;
      const filter = {email : email}
      const updatedDoc = {
        $set: {
          lastSignInTime: lastSignInTime
        }
      }

      const result =await usersCollection.updateOne(filter, updatedDoc)
      res.send(result);
    })

    app.delete('/users/:id', async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id)}
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    })






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

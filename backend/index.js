require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const cors = require('cors');
const connectDB = require('./utils');
const { authenticateToken } = require('./middleware')
const jwt = require('jsonwebtoken');
const userModel = require('./models/user.model');
const TravelStory = require('./models/travel.model');
const upload = require('./multer');
const path = require('path')
const fs = require('fs');
const { error } = require('console');
connectDB();
const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));

app.post("/signup", async( req, res) => {
    const {fullName, email, password} = req.body
    console.log(req.body)
    if(!fullName || !email || !password){
         res.status(401)
        .json('message : invalid credentail')}

     const user = await userModel.findOne({email});
     if(user) return res.status(400).json('user already exists');
     
     const hashPass = await bcrypt.hash(password,10);
     const newuser = await new userModel({
        fullName,
        email,
        password:hashPass
     });

     await newuser.save();

     const accessToken = jwt.sign(
        {userId: newuser._id},
        process.env.ACESSTOKEN_SECRET,
        {expiresIn: '71h'}
     );
     return res.status(201).json({
        error: false,
        user: {fullName: newuser.fullName, email: newuser.email},
        accessToken,
        message:"REGESTRATION SUCESSFULL"
     })
})

app.post("/login", async(req, res) => {
   const { email, password } = req.body;
   
   if( !email || !password) {
      return res.status(400).json({message:"email and password are required"})
   }

   const user = await  userModel.findOne({email});
   if(!user) {
      return res.status(400).json({message:"invalid credentail"})
   }

   const isPassValid = await bcrypt.compare(password, user.password)
   if(!isPassValid) {
      return res.status(400).json({message:"invalid credentail"})
   }

   const accessToken = await jwt.sign(
      {userId: user.id},
      process.env.ACESSTOKEN_SECRET,
      {
         expiresIn: "72h",
      }
   );

   return res.json({
      error: false,
      message: 'Login Successful',
      user: { fullName: user.fullName, email: user.email, _id: user._id},
      accessToken
   })
})

app.get('/get-user', authenticateToken,async( req, res) => {
   const userId = req.user.userId;

   const isUser = await userModel.findOne({_id: userId});

   if(!isUser) return res.sendStatus(401);

   return res.json({
      user: isUser,
      message: "",
   });
})



app.post('/add-travel-story',authenticateToken, async( req, res) => {
   const { title, story, visitedDate, imageUrl, visitedLocation } = req.body;
   const  userId  = req.user.userId;

   if(!title || !story || !visitedDate || !imageUrl || !visitedLocation) {
      return res.status(400).json({ error: true, message: "all field required"});
   }

   const parsedVisitedDate = new Date(parseInt(visitedDate));

   try {
      const travelStoryField = new TravelStory({
         title,
         story,
         visitedLocation,
         userId,
         imageUrl,
         visitedDate: parsedVisitedDate

      });
      await travelStoryField.save();
      res.status(200).json({story: travelStoryField, message: 'Added SuccessFully'})
   }
   catch (err) {
      console.log(err)
      res.status(400).json({error: true, message: err.message})
   }
})

app.get("/get-all-story", authenticateToken, async (req, res) => {
   const userId = req.user.userId;

   try {
      const travelStories = await TravelStory.find({userId: userId}).sort({isFavourite: -1});
      res.status(500).json({stories: travelStories})
   }
   catch (err) {
      res.status(500).json({error: ture , message: err.message})
   }
})

app.put('/update-travel-story/:id', authenticateToken, async( req, res) => {
   const { id } = req.params;
   const { title, story, visitedDate, imageUrl, visitedLocation } = req.body;
   const  userId  = req.user.userId;

   if(!title || !story || !visitedDate || !imageUrl || !visitedLocation) {
      return res.status(400).json({ error: true, message: "All field required"});
   }

   const parsedVisitedDate = new Date(parseInt(visitedDate));

   try {
      const travelStory = await TravelStory.findOne({_id:id, userId: userId});
      
      if(!travelStory) {
         return res.status(404).json({error: true, message:"Travel story not found!"})
      }
   }
   catch(err) {
      console.log(err);
      res.status(400).json({error: true, message: err.message})
   }

})

app.delete('/delete-travel-story/:id' ,authenticateToken ,async( req, res ) => {
   const { id } = req.params;
   const { userId } = req.user;

   const travelStory = await TravelStory.findOne({_id:id, userId: userId});
      
   if(!travelStory) {
      return res.status(404).json({error: true, message:"Travel story not found!"})
   }

   try{
      await travelStory.deleteOne({_id: id, userId: userId});

      const imageUrl = travelStory.imageUrl;
      const filename = path.basename(imageUrl);
   
      const filePath = path.join(__dirname, "uploads", filename);
   
      fs.unlink(filePath, (err) => {
         if(err) {
            console.error("failed to delete image file", err)
         }
      });
   
      res.status(200).json({message: "Travel story delete successfully"})
   }
   catch(err) {
      console.log(err);
      res.status(400).json({error: true, message: err.message})
   }
})

app.patch('/update-is-favourite/:id',authenticateToken, async (req, res) => {
   const { id } = req.params;
   const { isFavourite } = req.boby;
   const { userId } = req.user;

   try{
      const traveStory = await TravelStory.findOne({_id: id, userId: userId});

      if(!traveStory) {
         return res.status(404).json({error: true, message:"Travel story not found!"})
      } 
      traveStory.isFavourite = isFavourite;

      await traveStory.save();
      res.status(200).json({story: traveStory, message: "Update Successfully"})
   }
   catch(err) {
      console.log(err);
      res.status(400).json({error: true, message: err.message})
   }
})

app.get('/search' ,authenticateToken ,async (req, res) => {
   const { query } = req.query;
   const { userId } = req.user;

   if(!query) {
      return res.status(404).json({error: true, message: "Query is empty!"});
   }

   try {
      const searchResult = await TravelStory.find({
         userId: userId,
         $or: [
            { title: { $regex: query, $options: "i"} },
            { story: { $regex: query, $options: "i"} },
            { visitedLocation: { $regex: query, $options: "i"} },
         ]
      }).sort({ isFavourite: -1});

      res.status(200).json({stories: searchResult});
   }
   catch(err) {
      console.log(err);
      res.status(400).json({error: true, message: err.message})
   }
})

app.get('/travel-story-filter', authenticateToken, async (req, res) => {
   const { startDate, endDate } = req.query;
   const { userId } = req.user;


   try {
      const start = new Date(parseInt(startDate));
      const end = new Date(parseInt(endDate));

      const filterStories = await TravelStory.find({
         userId: userId,
         visitedDate: {
            $gte: start,
            $lte: end,
         },
      }).sort({ isFavourite: -1});
      res.status(200).json({error: false, stories: filterStories})
   }
   catch(err) {
      console.log(err);
      res.status(400).json({error: true, message: err.message})
   }
})


//image related
app.post("/image-up", upload.single('image'), async( req, res ) => {
   try{
      if(!req.file) {
         return res.status(400).json({error: true, message: "No image uploaded"})
      }
      console.log(req.file)
      const imageUrl = `http:loacalhot:8000/uploads/${req.file.filename}`;
      res.status(201).json({imageUrl});
   }
   catch(err) {
      console.log(err)
      res.status(400).json({error: true, message: err.message})
   }
})
app.delete("/delete-image", async( req, res) => {
   const { imageUrl } = req.query;

   if(!imageUrl) {
      return res.status(400).json({error: true, message: "ImageUrl parameter is required"});
   }

   try {
      const filename = path.basename(imageUrl);
      const filePath = path.join(__dirname, "uploads", filename)

      if(fs.existsSync(filePath)) {
         fs.unlinkSync(filePath);
         res.status(200).json({message: "Image deleted successfully !"})
      }
      else {
         res.status(200).json({error: true, message: "Image is not found"})
      }
   }
   catch(err) {
      console.log(err)
      res.status(500).json({error: ture, message: err.message})
   }
})

app.use("/uploads", express.static(path.join(__dirname, "uploads")))
app.use("/assets", express.static(path.join(__dirname, "assets")))

app.listen((8000), () => {
    console.log('app running on port 8000')
});

module.exports = app;
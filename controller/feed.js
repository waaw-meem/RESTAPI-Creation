const { validationResult } = require('express-validator')

const Post = require('../model/post')

exports.getPosts = (req,res,next) => {
    res.json({
        posts: [{
        _id:'1',
        title:'Post',
        content:"This is the first post",
        imageUrl:'images/cardImage.jpg',
        creator:{
          name:'Wali'
        },
        createdAt: new Date()
      }]
    });
}

// exports.createPost = (req, res, next) => {
//   const error = validationResult(req)
//   if(!error.isEmpty()){
//     return res.status(422).json({message:'Validation error, the entered data is incorrect', 
//     error:error.array()})
//   }
//     const title = req.body.title;
//     const content = req.body.content;
//     // Create post in db
//     res.status(201).json({
//       message: 'Post created successfully!',
//       post: { 
//         _id: new Date().toISOString(), 
//         title: title, 
//         content: content,
//         creator:{
//           name:'Wali'
//         },
//         createdAt: new Date()
//        }
//     });
//   };

exports.createPost = (req, res, next) => {
    const error = validationResult(req)
    if(!error.isEmpty()){
    const error = new Error('Validation error, the entered data is incorrect')
    error.statusCode = 422;
    throw error; 
    // return res.status(422).json({message:'Validation error, the entered data is incorrect', 
    // error:error.array()})
  }
  const title = req.body.title;
  const content = req.body.content;
  const post = new Post({
    title: title, 
    content: content,
    imageUrl:'images/cardImage.jpg',
    creator:{
    name:'Wali'
    },
  })
  post.save()
  .then(result => {
    res.status(201).json({
      message: 'Post created successfully!',
      post: result
    })
  })
  .catch(err => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  });
}
  
# meteor-collection-field-history
Save selected field(s) history on collection

**Usage:**
It adds a attachCollectionFieldHistory method to the meteor collections
~~~~
Posts = new Meteor.Collection("posts");
var config= {
  field: 'history', //The name of the property inside the collection where the data will be saved
  fields: ["message", "userId"], // Array with the name of the properties that you which to save. 
  lastModifiedField: "lastModifiedDate" // this will be the name of the property that will hold the date of the last time the document was changed
}
Posts.attachCollectionFieldHistory(config)
Post.insert({message:"hi", userId:"1", title:"hello"})
Posts.findOne()
 { _id: 'wTbCDz9aRkfD5EHLn',
   message: 'hi',
   userId: '1',
   title: 'hello',
   lastModifiedDate: Tue Oct 25 2016 11:01:11 GMT-0400 (AST),
   history: [
     { 
        message: 'hi',
        userId: '1',
        lastModifiedDate: Tue Oct 25 2016 11:01:11 GMT-0400 (AST)  
     }
   ]
}
Posts.update("wTbCDz9aRkfD5EHLn", {$set:{message:"hello"}}) 
Posts.findOne()
{ _id: 'wTbCDz9aRkfD5EHLn',
  message: 'hello',
  userId: '1',
  title: 'hello',
  lastModifiedDate: Tue Oct 25 2016 11:03:59 GMT-0400 (AST),
  history: 
   [ 
     {
       message: 'hello',
       lastModifiedDate: Tue Oct 25 2016 11:03:59 GMT-0400 (AST)
     },
     { 
       message: 'hi',
       userId: '1',
       lastModifiedDate: Tue Oct 25 2016 11:01:11 GMT-0400 (AST) 
      } 
   ] 
}

~~~~

const router = require("express").Router();
const Club = require("../models/club");


// 1. INDEX ROUTE
router.get("/", function(req, res) {
   res.redirect("/clubs"); 
});

router.get("/clubs", function(req, res) {
  // Find all clubs in the DB
  // Pass in data from all of them into the clubs page
  Club.find({}, function(err, club) {
    if (err) {
      console.log(err);
    } else {
      res.render("clubs", {clubs: club, user: req.user});
    }
  });
});

// 2. NEW ROUTE
router.get("/clubs/new", function(req, res) {
  res.render("new"); 
});

// 3. CREATE ROUTE
router.post("/clubs", function(req, res) {
  // Create a new club based on what the user typed into form. Push it into the DB.
  Club.create(req.body.club, function(err, club) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/clubs");
    }
  });
});

// 4. SHOW ROUTE
router.get("/clubs/:id", function(req, res) {
  // Find a club by id, pass its data into the show page, show page displays data
  Club.findById(req.params.id, function(err, club) {
    if (err) {
      console.log(err);
    } else {
      res.render("show", {club: club});
    }
  });
});

// 5. EDIT ROUTE
router.get("/clubs/:id/edit", function(req, res) {
    Club.findById(req.params.id, function(err, club) {
    if (err) {
      console.log(err);
    } else {
      res.render("edit", {club: club});
    }
  });
});

// 6. UPDATE ROUTE
router.put("/clubs/:id", function(req, res) {
  // Variables that stored the updated Club fields
    const editedClubName = req.body.club.clubName,
      editedDay = req.body.club.day,
      editedFacultyAdvisor = req.body.club.facultyAdvisor,
      editedRoom = req.body.club.room,
      editedTime = req.body.club.time,
      editedClubDescription = req.body.club.clubDescription;
    
 // Update the club object found by id, with the typed-in, edited values
 Club.findByIdAndUpdate(req.params.id, 
   {
     clubName: editedClubName,
     facultyAdvisor: editedFacultyAdvisor,
     clubDescription: editedClubDescription,
     room: editedRoom,
     day: editedDay,
     time: editedTime
   }, function(err, club) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/clubs");
      }
    });
});

// 7. Delete Route
router.delete("/clubs/:id", function(req, res) {
  // Find a club by id and remove it
  Club.findByIdAndRemove(req.params.id, function(err, club) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/clubs");
    }
  });
});

module.exports = router;
const express = require('express');
const router = express.Router();
const Place = require('../models/Place.model')


router.get("/", (req,res) => {
    Place.find()
    .then((allPlaces) => res.render("places/list-places", {allPlaces}))
    .catch(err => console.log(err))
})


router.get("/new-place", (req, res) => res.render("places/new-place"))


router.post("/new-place", (req, res) => {
    
    let location = {
		type: 'Point',
		coordinates: [req.body.longitude, req.body.latitude]
	}

    Place.create({
        name: req.body.name,
        type: req.body.type,
        location: location
        
    })
    .then(() => res.redirect("/places"))
    .catch(err => console.log(err))

});

router.get("/edit/:id", (req, res) => {
    Place.findById(req.params.id)
    .then((place) => res.render("places/edit-place", {place}))
    .catch(err => console.log(err))
})



router.post("/edit", (req, res) => {
    let location = {
		type: 'Point',
		coordinates: [req.body.longitude, req.body.latitude]
	}
    const {id, name, type} = req.body
    Place.findByIdAndUpdate(id, {name, type, location}, { new: true })
    .then((place) => res.redirect(`/places/edit/${id}`))
    .catch(err => {
        console.log(err)
        res.render("places/edit-place", {err})
    })
})

router.get("/delete/:id" , (req, res) => {
    Place.findByIdAndDelete(req.params.id)
    .then(() => res.redirect("/places"))
    .catch(err => console.log(err))
})


router.get('/api', (req, res, next) => {
	Place.find()
		.then(allPlaces => {
			res.status(200).json({ places: allPlaces });
		})
		.catch(err => console.log(err))
});
module.exports = router
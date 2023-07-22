const express = require('express')
const router = express.Router()
const Movie = require('../models/movies.js')

// POST /api/movie
router.post('/movie', async (req, res) => {
  // Create using custom ID
  // const lastCreatedMovie = await Movie.findOne({}, null, {
  //   sort: { id: -1 }
  // })

  // let nextId = 1

  // if (lastCreatedMovie && lastCreatedMovie.id) {
  //   nextId = lastCreatedMovie.id + 1
  // }

  const movie = new Movie({
    // id: nextId,
    title: req.body.title,
    year: req.body.year,
    genre: req.body.genre
  })

  try {
    const movieResult = await movie.save()
    res.status(201).json(movieResult)
  } catch (error) {
    res.status(400).json({ message: error.message})
  }
})

// GET /api/movie
router.get('/movie', async (req, res) => {
  try {
    // Callback, this can be used interchangably with async/await 
    // Movie.find().then((movies) => { res.status(200).json(movies) })
    const movies = await Movie.find()
    res.status(200).json(movies)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.patch('/movie/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    const updateMovieData = req.body
    const options = { new: true }

    // Update using custom ID
    // const updateResult = await Movie.findOneAndUpdate({ id }, updateMovieData, options)
    const updateResult = await Movie.findByIdAndUpdate(id, updateMovieData, options)
    res.status(200).send(updateResult)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

router.delete('/movie/:id', async (req, res) => {
  try {
    const id = req.params.id

    const deleteResult = await Movie.findByIdAndDelete(id)
    res.send({ message: `Movie with title ${deleteResult.title} successfully deleted`})
  } catch (error) {
    res.status().json({ message: error.message })
  }
})


module.exports = router
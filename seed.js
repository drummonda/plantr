const models = require('./models')
const db = models.db;
const Gardener = models.Gardener;
const Plot = models.Plot;
const Vegetable = models.Vegetable;

db.sync({force: true})
  .then(() => {
    console.log('Database synced!')
    return Vegetable.create({name:'Carrot', color: 'orange',planted_on: new Date()})

    .then((vegetable) => {
      return Gardener.create({name:'Farmer John', age: 85, favoriteVegetableId: vegetable.id })

      .then((gardener) => {
        console.log("New Gardener: ", gardener)
        return Plot.create({size: 5, shaded: true, gardenerId: gardener.id})

      })
    })})
    // db.close() // only if using a version of node without `finally`
  .catch(err => {
    console.log('Disaster! Something went wrong! ')
    console.log(err)
    // db.close() // only if using a version of node without `finally`
  })
  .finally(() => { // only if using a version of node WITH `finally`
    db.close()
  })




const router = require('express').Router();
const { Category, Product } = require('../../models');

// finds all categories
router.get('/', (req, res) => {
  Category.findAll({
    include: Product
  })
  .then(catgData => res.json(catgData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

//finds one category by its `id` value
router.get('/:id', (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    },
    include: Product
  })
  .then(catgData => res.json(catgData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', (req, res) => {
  Category.create({
    category_name: req.body.category_name
  })
  .then(catgData => res.json({"Success": "User Created!", "Category": catgData}))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(catgData => {!catgData ? 
    res.status(404).json({"message": "No category found with this id"}) :
    res.json({"Success":"Category has been updated", "Category": catgData})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
})

router.delete('/:id', (req, res) => {
  Category.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(catgData => {!catgData ? 
    res.status(404).json({"message": "No category found with this id"}) :
    res.json({"Success":"Category has been updated", "Category": catgData})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
})


module.exports = router;
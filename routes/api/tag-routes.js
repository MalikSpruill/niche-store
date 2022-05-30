
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// finds all tags with associated product data
router.get('/', (req, res) => {
  Tag.findAll({
    include: Product
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// find one tag with associated data
router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {
      id: req.params.id
    },
    include: Product
  })
  .then(tagData => res.json(tagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// create a new tag
router.post('/', (req, res) => {
  Tag.create({
    tag_name: req.body.tag_name
  })
  .then(tagData => res.json({"Success": "Tag Created!", "Tag": tagData}))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

// update a tag
router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
  .then(tagData => {!tagData ? 
    res.status(404).json({"message": "No Tag found with this id"}) :
    res.json({"Success":"Tag has been updated", "Tag": tagData})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

// delete a tag
router.delete('/:id', (req, res) => {
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then(tagData => {!tagData ? 
    res.status(404).json({"message": "No Tag found with this id"}) :
    res.json({"Success":"Tag has been deleted", "Tag": tagData})
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});

module.exports = router;
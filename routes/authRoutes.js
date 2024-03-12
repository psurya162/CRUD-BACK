const express = require("express");
const { createUuser , loginUsercntrl, getAllUser, SingleUser, DeleteUser, UpdateUser,  } = require("../Controller/userControler");
const router = express.Router()



router.post('/register',createUuser)
router.post('/login',loginUsercntrl)
router.get('/allUser',getAllUser)
router.get('/:id',SingleUser)
router.delete('/:id',DeleteUser)
router.patch("/:id",UpdateUser)

module.exports = router;
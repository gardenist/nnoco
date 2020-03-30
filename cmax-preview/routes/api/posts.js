const express = require('express');
const router = express.Router();

const db = require('../../models');
const { Post, User } = db;

// /api/posts

router.get('/', (req, res) => {
  // 목록 조회
  // SELECT * FROM post
  Post.findAll({
    include: [
        {
            model: User,
            attributes: ['id', 'nickname']
        }
    ]
  }).then(posts => res.json(posts));
});

router.get('/:id', (req, res) => {
    Post.findOne({
        include: [{
            model: User,
            attributes: ['id', 'nickname']
        }],
        where: {
            id: req.params.id
        }
    }).then(post => {
        res.json(post);
    });
});

router.post('/', (req, res) => {
    Post.create({
        ...req.body
    }).then(post => {
        res.json({
            id: post.id
        });
    });
});

module.exports = router;
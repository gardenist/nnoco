const express = require('express');
const router = express.Router();

const { Post, User } = require('../../models');

router.get('/', (req, res) => {
    Post.findAll({
        include: [{
            model: User,
            attributes: ['id', 'nickname']
        }],
        order: [['id', 'desc']]
    }).then(posts => {
        res.json(posts);
    });
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
const { Router } = require('express');

const router = Router();

router.get('/', (request, response) => {
    response.status(200).send({
        message: "Hello World!"
    });
});

module.exports = router;

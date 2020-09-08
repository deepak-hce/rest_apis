



function renderWelcome(req, res) {

    console.log(req);

    return res.render('welcome', {
        query: req.query
    });
}


module.exports = { renderWelcome };

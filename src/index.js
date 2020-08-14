const express = require('express');
const nunjucks = require('nunjucks');

const Subjects = require('./database/subjectsCreation');

const app = express();

nunjucks.configure('pages', {
    express: app,
    noCache: true,
    autoescape: true
});

app.use(express.static('../public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', async function (req, res) {
    try {
        const subjects = await Subjects.findAll();
        return res.render('index.html', { subjects });
    } catch (error) {
        console.error(error);
    };
    return res.status(500), send("Error!")
});

app.get('/subjects', async function (req, res) {
    try {
        const subjects = await Subjects.findAll({
            attributes: [ 'id', 'name', 'percentage' ],
            order: [
                ['name']
            ]
        });
        return res.status(200).send({ subjects });
    } catch (error) {
        console.error(error);
    };
    return res.status(500), send("Error!")
});

app.post('/', async function (req, res) {
    const newRow = req.body;

    try {
        const newSubject = new Subjects(newRow);
        await newSubject.save();
    } catch (error) {
        console.error(error)
    }
    return res.redirect('/');
});

app.put('/', async function (req, res) {
    const reqName = req.body.name;
    const reqPercentage = req.body.percentage;

    try {
        await Subjects.update({ percentage: reqPercentage }, {
            where: {
                name: reqName
            }
        })
        const subject = await Subjects.findAll({
            attributes: [ 'percentage' ],
            where: {
                name: reqName
            }
        });
        return res.status(200).send([ subject[0].dataValues.percentage ]);
    } catch (error) {
        console.error(error);
    };
    return res.status(500).send("Error!");
});

app.delete('/', async function (req, res) {
    const reqName = req.body.name;

    try {
        await Subjects.destroy({
            where: {
                name: reqName
            }
        });
        return res.status(204).send("Success");
    } catch (error) {
        console.error(error);
    };

    return res.status(500).send("Error!");
})

app.listen(5500);
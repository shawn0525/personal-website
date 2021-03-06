const express = require("express");
const router = express.Router();
const path = require('path');
const sortProjects = require("../tools/utils").sortProjects;
const sortCertificates = require("../tools/utils").sortCertificates;

const Project = require("../models/project");
const Category = require("../models/category");

router.get("/ws/projects", async function (req, res) {
    let projects = await Project.getAll();
    sortProjects(projects);
    return res.status(200).json(projects);
});

router.get("/ws/project/:id", async function (req, res) {
    const project = await Project.getById(req.params.id);
    return res.status(200).json(project);
});

router.get("/ws/categories", async function (req, res) {
    let categories = await Category.getAll();
    return res.status(200).json(categories);
});

const allowedExt = ['.js', '.ico', '.css', '.png', '.jpg', '.woff2', '.woff', '.ttf', '.svg', '.pdf'];

router.get("*", function (req, res, next) {
    if (allowedExt.filter(ext => req.url.indexOf(ext) > 0).length > 0) {
        res.sendFile(path.resolve(`frontend/dist/${req.url}`));
    } else {
        res.sendFile(path.resolve('frontend/dist/index.html'));
    }
});

module.exports = router;

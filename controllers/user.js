const { User } = require("../models/User");
const { differenceInMilliseconds } = require("date-fns");
const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().select(["_id", "username"]).exec();
    return res.json(users);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const user = new User(req.body);
  try {
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    next(error);
  }
});

router.post("/:_id/exercises", async (req, res, next) => {
  const id = req.params._id;
  try {
    const user = await User.findById(id);
    const { _id, ...exercise } = {
      ...req.body,
      date: req.body.date ? new Date(req.body.date) : new Date(),
    };
    user.exercises.push(exercise);
    await user.save();
    return res.json({ _id: user._id, username: user.username, ...exercise });
  } catch (error) {
    next(error);
  }
});

router.get("/:_id/logs", async (req, res, next) => {
  const { from, to, limit } = req.query;
  const fromDate = new Date(from);
  const toDate = new Date(to);
  try {
    const user = await User.findById(req.params._id);
    const logs = user.exercises
      .filter(
        ({ date }) =>
          (differenceInMilliseconds(date, fromDate) > 0) &
          (differenceInMilliseconds(date, toDate) < 0)
      )
      .slice(0, limit);
    return res.json({
      _id: user._id,
      username: user.username,
      logs,
      count: logs.length,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = { userRoutes: router };

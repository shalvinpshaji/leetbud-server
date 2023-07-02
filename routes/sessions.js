const express = require("express")
const { getSession, getSessions, createSession, deleteSession, updateSession}  = require("../controllers/sessionController")

const router = express.Router()

router.get("/", getSessions)

router.get("/:id", getSession)

router.post("/", createSession)

router.delete("/:id", deleteSession)

router.patch("/:id", updateSession)


module.exports = router
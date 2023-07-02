const sessionModel = require("../models/sessionModel")
const mongoose = require("mongoose")

// get all sessions
const getSessions = async (req, res) =>{
    const sessions = await sessionModel.find({}).sort({createdAt: -1})
    
    res.status(200).json(sessions)
}

//get single session
const getSession = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            error: "Session not found"
        })
    }

    const session = await sessionModel.findById(id)

    if (!session){
        return res.status(404).json({
            error: "Session not found"
        })
    }
    res.status(200).json(session)
}

// create a session
const createSession = async (req, res) =>{
    const { title, url } = req.body
    try {
        const session = await sessionModel.create({ title, url })
        res.status(200).json(session)
    }
    catch(error){
        res.status(400).json({error: error.message})
    }
}


//delete a session 
const deleteSession = async (req, res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "Session not found"})
    }
    
    const session = await sessionModel.findOneAndDelete({_id: id})
    
    if (!session){
        return res.status(404).json({
            error:  "Session not found"
        })
    }
    res.status(200).json(session)
}

//update a session 
const updateSession = async (req, res) =>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404).json({error: "Session not found"})
    }

    const session  = await sessionModel.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if (!session){
        return res.status(404).json({
            error:  "Session not found"
        })
    }
    res.status(200).json(session)
}

module.exports ={
    createSession,
    getSessions,
    getSession,
    updateSession,
    deleteSession
}
const api = require('express').Router();
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };


api.get('/notes', (req, res) => {
    readFromFile('./db/db.json')
    .then((fritata)=>{
      res.json(JSON.parse(fritata))
      console.log(`Here is your fritata!
      ${fritata}`)
    })
  
    })
  
api.get('/notes', (req, res) => {
    res.sendFile('notes.html')
  
    })

api.post('/notes', (req, res) => {

    const { noteTitle, noteContent} = req.body;
    
    if (req.body) {
        const newNote = {
          title:req.body.title,
          text:req.body.text
        };
        console.log(`Title ${newNote.noteTitle} Content ${newNote.noteContent}`)
        readAndAppend(newNote, './db/db.json');
        res.json(`FUCK YOU TONY`);
    } else {
        res.error('Error in adding FUCK YOU to TONY');
    }
    })



    module.exports = api;
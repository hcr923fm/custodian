//Install express server
const express = require('express');
const path = require('path');
const fs = require('fs')
//import * as environment from './src/environments/environment'
const dotenv = require('dotenv').config()

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/custodian'));

app.get("/file_list", function (req, res) {
    let file_names = fs.readdirSync(process.env["AUDIO_FILE_DIRECTORY"])
        .filter((file_name) => {
            return file_name.toUpperCase().endsWith(".MP3")
        })
    res.json(file_names)
})

app.get("/file/:id", function (req, res) {
    let file_name = req.params["id"]
    let audio_file_path = path.join(process.env["AUDIO_FILE_DIRECTORY"], file_name)
    res.sendFile(audio_file_path, {
        headers: { "Content-Type": "audio/mpeg" }
    })
})

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/custodian/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
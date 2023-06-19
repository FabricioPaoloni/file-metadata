const express = require('express');
const cors = require('cors');
require('dotenv').config();
const multer = require('multer');
const upload = multer({ dest: './public/files' })

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});


app.post('/api/fileanalyse', upload.single('upfile'), (req, res) => {
  let [fileName, fileType, fileSize] = [req.file.originalname, req.file.mimetype, req.file.size];
  res.json({
    name: fileName,
    type: fileType,
    size: fileSize
  })
})

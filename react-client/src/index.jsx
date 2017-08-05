import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Upload from './components/Upload.jsx';
import { validFileType, returnFileSize, fileTypes } from './helpers/helpers.js';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      photo: null
    }
    this.updateImageDisplay = this.updateImageDisplay.bind(this);
    this.submitImage = this.submitImage.bind(this);
  }

  updateImageDisplay() {
    while(this.preview.firstChild) {
      this.preview.removeChild(this.preview.firstChild);
    }
    let curFiles = this.input.files;
    console.log('uploaded: ', curFiles);
    this.setState({photo: curFiles})
    if(curFiles.length === 0) {
      let para = document.createElement('h2');
      para.textContent = 'No files currently selected for upload';
      this.preview.appendChild(para);
    } else {
      let list = document.createElement('div');
      this.preview.appendChild(list);
      for(let i = 0; i < curFiles.length; i++) {
        let listItem = document.createElement('div');
        let para = document.createElement('p');
        if(validFileType(curFiles[i])) {
          para.textContent = 'File name ' + curFiles[i].name + ', file size ' + returnFileSize(curFiles[i].size) + '.';
          let image = document.createElement('img');
          image.src = window.URL.createObjectURL(curFiles[i]);

          listItem.appendChild(image);
          listItem.appendChild(para);

        } else {
          para.textContent = 'File name ' + curFiles[i].name + ': Not a valid file type. Update your selection.';
          listItem.appendChild(para);
        }
      list.appendChild(listItem);
      }
    }
  }

  submitImage(e) {
    e.preventDefault();
    var form = new FormData();
    form.append("image", this.state.photo[0]);
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "https://api.imgur.com/3/image",
      "method": "POST",
      "headers": {
        "authorization": "Client-ID 3ec73e8df33fffc"
      },
      "processData": false,
      "contentType": false,
      "data": form
    }

    $.ajax(settings).done((response) => {
      var name = this.state.photo[0].name;
      axios.post('/images', {image: response['data'], name: name})
      .then((err, res) => {
        if(err) {
          console.log('failed to save to db');
        } else {
          console.log('success!: ', response['data']);
          res.send(res)
        }
      })
      .catch((err) => console.log('FAILED: ', err));
    });
  }

  componentDidMount() {
    this.input = document.querySelector('input');
    this.preview = document.querySelector('.preview');
  }

  render () {
    return (<div>
      <h1>Upload Images</h1>
      <Upload submit={this.submitImage} change={this.updateImageDisplay}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
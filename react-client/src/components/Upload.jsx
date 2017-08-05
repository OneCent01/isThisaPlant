import React from 'react';

const Upload = (props) => (
  <div>
    <form onSubmit={event => props.submit(event)}>
      <input onChange={props.change} id="code" type="file"/>
      <div className="preview">
        <p>No files currently selected for upload</p>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  </div>
)

export default Upload;
import React from 'react';

const NewStoryModal = (props) => (
  <div className="modal" id="NewStoryModal">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header bg-danger">
            <h5 className="modal-title text-white">New Story</h5>
            <button className="close" data-dismiss="modal">&times;</button>
          </div>
          <div className="modal-body">
            <div className="form-group">
                <label htmlFor="newStoryTitle">Title</label>
                <input id="NewStoryTitle"type="text" placeholder="Add Title Here" className="form-control"/>
              </div>
              <div className="form-group">
                  <label htmlFor="newStoryText">Story Text</label>
                  <textArea id="NewStoryText" placeholder="Start story here, 250 characters or less" className="form-control"></textArea>
              </div>
          </div>
          <div className="modal-footer">
            <button onClick={() => props.handleNewSubmission(document.getElementById('NewStoryTitle').value, document.getElementById('NewStoryText').value)} className="btn btn-secondary">Start New Story</button>
          </div>
        </div>
      </div>
    </div>
)




export default NewStoryModal;

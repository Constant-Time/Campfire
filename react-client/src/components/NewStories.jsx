import React from 'react';
import NewStoriesStory from './NewStoriesStory.jsx';
const NewStories = (props) => (
  <div className="row py-4 px-4">
      <div className="container">
      <div className="card newStoryCard">
        <div className="card-header text-center py-2 bg-danger text-white text-align-bottom" >
          <h3>More Stories</h3>
        </div>
        {props.isLoggedIn ? <button className="btn-outline-danger m-2" data-toggle="modal" data-target="#NewStoryModal">Add New Story</button> :
        <div className="text-center">



  <button className="btn btn-outline-danger m-2" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
    Add New Story
  </button>
<div className="collapse" id="collapseExample">
  <div className="alert alert-danger" role="alert">
    Must be logged in to add a new story.
  </div>
</div>



        </div>}
        <div className="card card-body currentStoryBody">
        <ul className="list-group list-group-flush">
          {props.stories.map((story, index) => <NewStoriesStory story={story} key={index} handleTitleClick={props.handleTitleClick}/>)}
        </ul>
      </div>
      </div>
    </div>
  </div>
)

export default NewStories
//2A294C
//2D2B37
/*
<h3 className="mb-0">
  <a href="#collapseOne" data-Toggle="collapse" data-parent="accordion">
    Question One
  </a>
</h3>
</div>
<span>
<i className="fa fa-star"></i>

</span>

<div className="card">
  <div className="card-header">
    <ul className="list-group">
      <li className="list-group-item active">Cras justo odio</li>
      <li className="list-group-item">Dapibus ac facilisis in</li>
      <li className="list-group-item">Morbi leo risus</li>
      <li className="list-group-item">Porta ac consectetur ac</li>
      <li className="list-group-item">Vestibulum at eros <span><i className="fa fa-star"></i></span></li>
    </ul>
</div>
</div>

<li className="list-group-item">Cras justo odio</li>
<li className="list-group-item">Dapibus ac facilisis in</li>
<li className="list-group-item">Vestibulum at eros Dapibus ac facilisis in</li>
<li className="list-group-item">Cras justo odio</li>
<li className="list-group-item">Dapibus ac facilisis in</li>
<li className="list-group-item">Vestibulum at eros</li>
<li className="list-group-item">Cras justo odio</li>
<li className="list-group-item">Dapibus ac facilisis in Dapibus ac facilisis in</li>
<li className="list-group-item">Vestibulum at eros</li>
<li className="list-group-item">Vestibulum at eros</li>
<li className="list-group-item">Cras justo odio</li>
<li className="list-group-item">Dapibus ac facilisis in Dapibus ac facilisis in</li>
<li className="list-group-item">Vestibulum at eros</li>
<li className="list-group-item">Vestibulum at eros</li>


<button className="btn-outline-danger m-2 disabled">Add New Story</button>
<div className="alert alert-danger" role="alert">
  Must be logged in to add a new story.
</div>
*/

import React from 'react';
import NewStoriesStory from './NewStoriesStory.jsx';
const NewStories = (props) => (
  <div className="row py-4 px-4">
      <div className="container">
      <div className="card newStoryCard">
        <div className="card-header text-center py-2 bg-danger text-white text-align-bottom" >
          <h3>More Stories</h3>
        </div>

  <div>
    <div className="input-group mt-3 mb-0">
      <div className="input-group-prepend">
        <label className="input-group-text" htmlFor="inputGroupSelect01">Sort by:</label>
      </div>
      <select className="custom-select" id="inputGroupSelect01" value={props.sortBy} onChange={props.handleSortSelect}>
        <option value="Oldest">Oldest</option>
        <option value="Newest">Newest</option>
        <option value="My Favorites">My Favorites</option>
      </select>
      <div className="input-group-prepend">
        <button className="btn" type="button" onClick={() => props.getTitles()}><i className="fas fa-sync"></i></button>
      </div>
    </div>
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
        <div className="card card-body moreStoriesBody">
        <ul className="list-group list-group-flush">
          {props.stories.map((story, index) => <NewStoriesStory story={story} key={index} handleTitleClick={props.handleTitleClick} currStoryID={props.currStoryID} />)}
        </ul>
      </div>
      </div>
    </div>
  </div>
)

export default NewStories

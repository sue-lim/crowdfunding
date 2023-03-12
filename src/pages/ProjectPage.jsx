
// SEPARATE PAGE WITH THE INDIVIDUAL PROJECTS 

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

//Components
import PledgeForm from "../components/PledgeForm/PledgeForm";
import CommentForm from "../components/CommentForm/CommentForm";
import ProgressBar from "../components/ProgressBar/ProgressBar";

function ProjectPage() {
  // State
  const [projectData, setProjectData] = useState({ pledges: [] });
  const [commentData, setCommentData] = useState({ comments: [] });

  // Hooks
  const { id } = useParams();

   // Check user is LoggedIn
   const token = window.localStorage.getItem("token");

  //Effects
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}projects/${id}`)
      .then((results) => {
        return results.json();
      })
      .then((data) => {
        setProjectData(data);
        setCommentData(data);


      });
  }, []);



  return (
<div className="min-h-screen flex items-center justify-center">
  <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2">
  {/* COLUMN 1  */}
    <div className="flex">
      
      <div className="project-card-img"> 
        <div className="project-pg-container-left">
          <h2 className="project-card-title">{projectData.title}</h2> 
          <img src={projectData.image} /> 
        </div>
        <div className="project-pg-container-left">
          <h4>Created at: {new Date(projectData.date_created).toDateString()}</h4>         
          <p> Description: {projectData.description} </p>
          </div>
        </div>
      </div>

      {/* COLUMN 2  */}
      <div className="">
        <div className="project-card-pledges">
          <div className="project-card-progressbar">
          <ProgressBar goal={projectData.goal} sum_pledges={projectData.sum_pledges} />
          
        </div>
        </div>

          <div className="project-card-pledges">
          <div className="project-pg-container-sml-pledges">
            <ul>
              <h4>Pledges</h4>
              {projectData.pledges &&
              projectData.pledges.map((pledgeData, key) => {
              return (
              <li key={key}>
              <p>$ {pledgeData.amount} from: {pledgeData.supporter} 
              <span role="img"> ♠ </span>{pledgeData.comment}</p>
              </li>
              );
              })}
            </ul> 
          </div>
        <PledgeForm/>
      </div>

      <div className="project-card-comments">
        <div className="project-pg-container-sml-comments">
          <ul>
          <h4>Comments</h4>
          {commentData.comments &&
          commentData.comments.map((commentData, key) => {
          return (
          <li key={key}>
          <p>{commentData.commentator}  says ... {commentData.title} </p>
          </li>
          );
          })}
          </ul>
        </div>
        <CommentForm/>
      </div>

    </div>
  </div>
</div>
  );
}

export default ProjectPage;
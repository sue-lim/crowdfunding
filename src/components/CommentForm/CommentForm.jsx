import React, { useState } from "react";
import { useInRouterContext, useNavigate, useParams, useOutletContext } from "react-router-dom";

// CSS 

function CommentForm(props) {
    const {project} = props;
  
    const [comments, setComments] = useState({
        // from JSON Raw Body in Deployed (default values)
        // this is what you return at the bottom - your list might look different to mine. If so, don't worry!
        "title": "",
        "content": "",
        // "project": null,        
    });

    // enables redirect
    const navigate = useNavigate();

    // accesses project ID so the pledge can be connected to it
    const { id } = useParams();

    // copies the original data, replaces the old data for each id/value pair to what is input in the form (changes state). this will be submitted to API below
    const handleChange = (event) => {
        const { id, value } = event.target;
        //data is being sent 
        setComments((prevComments) => ({
        ...prevComments,
        [id]: value,
        //this is the project I want to call & is the page I'm looking at
        }));
    };

    // submit the new data (state change) from handleChange.
        // POST has been moved from separate function to be embedded and actioned when the submit button is pressed. 
    const handleSubmit = async (event) => {
        event.preventDefault();

        // get auth token from local storage
        const authToken = window.localStorage.getItem("token")

        // if the auth token exists (if logged in) 
            // TRY to POST the data to your deployed, using fetch.
            // send the token with it to authorise the ability to post
                // wait for the response - 
                // if successful, return the JSON payload and reload the page with the data
                // if not successful, CATCH the error and display as a pop up alert
        // if not logged in, redirect to login page

        if (authToken) {
            // if (LoggedIn) {
            try {
                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}comments/`,
                    {
                    method: "post",
                    headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Token ${authToken}`,
                },
                body: JSON.stringify(
                    // {project:props.project.id, amount:pledges.amount, comment:pledges.comment, anonymous:pledges.anonymous}
                    // removed props from the above as we amended the line above.
                    // {project:project.id, amount:pledges.amount, comment:pledges.comment, anonymous:pledges.anonymous}
                    {project:project.id,...comments}

                ),
                }
                );
                if (!response.ok) {
                    throw new Error(await response.text());
                }
                location.reload();
            } catch (err) {
                console.error(err);
                alert(`Error: ${err.message}`);
            }
        } else {
        //REDIRECT TO LOGIN PAGE 
        navigate(`/`);
        }
    };

    
    return (
        //SUPPORTER - AUTO GENERATED 
        //DRF NOTES - ID AUTO GENERATED 
        <div>
        <form className="form-container-sml" onSubmit={handleSubmit}>
            <div className="mb-2">
            <label
            className="form-labels-sml" 
            htmlFor="title">Title:</label>
            <input
                className="input-sml-field"
                type="text"
                id="title"
                placeholder="Enter a title"
                onChange={handleChange}
            />
            </div>
            <div className="mb-2">
            <label
            className="form-labels-sml"
            htmlFor="content">Comment:</label>
            <input
                className="input-sml-field"
                type="text"
                id="content"
                placeholder="Enter Comment"
                onChange={handleChange}
            />
            </div>
            {/* <div className="mt-2"></div> */}

            <button className="bg-gray-500 hover:bg-gray-700 text-white  py-.5 px-4 rounded focus:outline-none focus:shadow " type="submit">Comment</button>
        </form>
        </div>
    );
}

export default CommentForm;
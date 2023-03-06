import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function LoginForm() {
    const [, setLoggedIn] = useOutletContext();
    // State
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    
    //Hooks
    const navigate = useNavigate();
    // Actions
    const handleChange = (event) => {
        const { id, value } = event.target;
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [id]: value,
        }));
    }
    const postData = async () => {
        const response = await fetch(
            `${import.meta.env.VITE_API_URL}api-token-auth/`,
            {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials),
            }
        );
        return response.json();
    };
const handleSubmit = async (event) => {
    event.preventDefault();
    if (credentials.username && credentials.password) {
        const { token } = await postData();
        if (token !== undefined) {
            window.localStorage.setItem("token", token);
            setLoggedIn(true);
            navigate("/");
        } else {
            setLoggedIn(false);
        }
    }
};
    return (

<div className="grid grid-cols-3 gap-5 mt-8">
  <div></div>
    <div className="w-full max-w-xs rounded px">
        <form 
            onSubmit={handleSubmit}
            className="form-container">
                <h3>Login</h3>
                <div className="mb-4">
                    <label 
                        className="form-labels" 
                        htmlfor="username"> 
                        Username 
                    </label>
                    <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text" 
                        id="username" 
                        onChange={handleChange}
                        placeholder="Username"          
                    />
                </div>

                <div className="mb-6">
                    <label 
                        className="form-labels"> 
                        Password 
                    </label>
                        <input 
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" 
                        type="password" 
                        id="password" 
                        onChange={handleChange}
                        placeholder="******************"
                    />
                    <p className="text-gray-500 text-xs italic">Please enter your password</p>
                </div>

                <div className="flex items-center justify-between">
                <button type="submit" className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >
                    Log In
                </button>
                <p className="text-center text-gray-500 text-xs">
                No login ? ...  <a href='registration'> Here</a></p>

                </div>
            </form>

        </div>
</div>
            
        );
}
export default LoginForm;

// TAILWIND TEMPLATE - https://tailwind-elements.com/docs/standard/forms/form-templates/
import { Link } from "react-router-dom";
import "./styles/SignOut.css"

export default function SignOut ({ setToken }) {
    
    async function signOut(event) {
        event.preventDefault();
        
        const responseBody = await response.json();
    
        if (response.status === 200) {
            console.log(responseBody);
        } else {
            console.log(responseBody.message);
        };
    }
    
    return (
      <div onSubmit={signOut} className="SignOut">
          <Link to="/signin" onClick={() => {
              localStorage.removeItem("jwt-token")
          }} className="SignOutLink">Sign Out</Link>
      </div>
    )
  }
  
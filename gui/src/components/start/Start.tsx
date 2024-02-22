import {Link} from "react-router-dom";

export default function Start(){
    return (
        <>
            <div>Start page</div>
            <Link to="/home">
                <text>Visit your profile</text>
            </Link>
        </>
    )
}
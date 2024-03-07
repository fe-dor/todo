import {Link} from "react-router-dom";

export default function Start() {
    return(
        <>
            <Link to="/home">
                <button>Get started!</button>
            </Link>
        </>
    )
}
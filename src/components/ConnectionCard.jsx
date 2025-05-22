function ConnectionCard({ connection }) {
    return (
        <>
            <li className="list-row mt-3 mb-3 bg-base-200 w-130 align-center">
                <div><img className="size-10 rounded-box" src={connection.profile} /></div>
                <div>
                    <div>{connection.firstName + " " + connection.lastName}</div>
                    <p className="text-xs">Email: {connection.email}</p>
                </div>
                {connection.age && connection.gender && <p className="list-col-wrap text-xs">{connection.age + ", " + connection.gender}</p>}
                <button className={connection.status === "accepted" ? "btn btn-outline btn-success" : "btn btn-outline btn-error"}>{connection.status === "accepted" ? "Accepted" : "Rejected"}</button>
            </li >
        </>
    )
}

export default ConnectionCard;

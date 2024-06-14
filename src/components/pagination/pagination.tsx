export default function Pagination() {
    return (
        <div className="w-full flex justify-center my-10">
            <div className="join">
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="1"/>
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="2"/>
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="3" checked/>
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="4"/>
                <input className="join-item btn btn-square" type="radio" name="options" aria-label="4"/>
            </div>
        </div>

    );
}
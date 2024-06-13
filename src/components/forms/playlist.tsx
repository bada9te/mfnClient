export default function PlaylistForm() {
    return (
        <form className="card-body">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Playlist title</span>
                </label>
                <input type="text" placeholder="Title" className="input input-bordered shadow-md" required/>
            </div>

            <div className="form-control mt-4">
                <button className="btn btn-primary">Create playlist</button>
            </div>
        </form>
    );
}
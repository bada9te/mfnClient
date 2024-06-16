export default function ProfileEditForm() {
    return (
        <div className="card-body">
            <div className="divider divider-primary">Basics</div>

            <form>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Profile nickname</span>
                    </label>
                    <div className="join w-full">
                        <input type="text" placeholder="Nickname" className="input input-bordered shadow-md w-full"
                               required/>
                        <button className="btn btn-primary join-item">Save</button>
                    </div>
                </div>
            </form>

            <form>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Profile description</span>
                    </label>
                    <div className="join w-full">
                        <input type="text" placeholder="Description" className="input input-bordered shadow-md w-full"
                               required/>
                        <button className="btn btn-primary join-item">Save</button>
                    </div>
                </div>
            </form>

            <div className="divider divider-primary">Email</div>

            <form>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Old Email</span>
                    </label>

                    <input type="text" placeholder="Old email" className="input input-bordered shadow-md w-full"
                           required/>

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">New Email</span>
                    </label>
                    <div className="join w-full">
                        <input type="text" placeholder="New email" className="input input-bordered shadow-md w-full"
                               required/>
                        <button className="btn btn-primary join-item">Save</button>
                    </div>
                </div>
            </form>


            <div className="divider divider-primary">Socials</div>
            <button className="btn btn-error">Connect google</button>
            <button className="btn btn-info">Connect facebook</button>
            <button className="btn btn-neutral">Connect twitter</button>
        </div>

    );
}
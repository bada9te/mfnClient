"use client"
import { revalidatePathAction } from "@/actions/revalidation";
import { useAppSelector } from "@/lib/redux/store";
import { usePlaylistCreateMutation } from "@/utils/graphql-requests/generated/schema";
import { useSnackbar } from "notistack";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    title: string,
    publiclyAvailable: boolean;
}

export default function PlaylistForm() {
    const { handleSubmit, register, formState: {errors}, reset } = useForm<Inputs>();
    const user = useAppSelector(state => state.user.user);
    const {enqueueSnackbar} = useSnackbar();

    const [ createPlaylist ] = usePlaylistCreateMutation();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        enqueueSnackbar("Creating playlist...", {autoHideDuration: 1500});
        createPlaylist({
            variables: {
                input: {
                    title: data.title,
                    public: data.publiclyAvailable,
                    owner: user._id
                }
            }
        }).then(_ => {
            enqueueSnackbar("Playlist created", {variant: 'success', autoHideDuration: 2000});
            reset();
            revalidatePathAction("/playlists/my-playlists", "page");
            revalidatePathAction("/playlists/explore", "page");
        }).catch(_ => {
            enqueueSnackbar("Playlist can not be created", {variant: 'error', autoHideDuration: 3000});
        })
    }

    return (
        <form className="card-body text-white glass bg-black shadow-2xl" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="divider divider-primary">Playlist setup</div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Playlist title</span>
                </label>
                <input type="text" placeholder="Title" className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                    ...register("title", {
                        required: { value: true, message: "This field is required" }
                    })
                }/>
                {
                    errors.title &&
                    <label className="label">
                        <span className="label-text text-error">{errors.title.message}</span>
                    </label>
                }
            </div>

            <div className="form-control">
                <label className="label cursor-pointer">
                <span className="label-text">Publicly available</span>
                    <input type="checkbox" className="checkbox checkbox-primary" {
                        ...register("publiclyAvailable")
                    }/>
                </label>
            </div>

            <div className="form-control mt-4">
                <button className="btn btn-primary glass text-white">Create playlist</button>
            </div>
        </form>
    );
}
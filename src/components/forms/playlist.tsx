"use client"
import { revalidatePathAction } from "@/actions/revalidation";
import { getDictionary } from "@/dictionaries/dictionaries";
import { useAppSelector } from "@/lib/redux/store";
import { usePlaylistCreateMutation } from "@/utils/graphql-requests/generated/schema";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    title: string,
    publiclyAvailable: boolean;
}

export default function PlaylistForm({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { handleSubmit, register, formState: {errors}, reset } = useForm<Inputs>();
    const user = useAppSelector(state => state.user.user);
    const {enqueueSnackbar} = useSnackbar();
    const [ isLoading, setIsLoading ] = useState(false);

    const [ createPlaylist ] = usePlaylistCreateMutation();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        setIsLoading(true);
        enqueueSnackbar("Creating playlist...", {autoHideDuration: 1500});
        createPlaylist({
            variables: {
                input: {
                    title: data.title,
                    public: data.publiclyAvailable,
                    owner: user?._id as string
                }
            }
        }).then(_ => {
            enqueueSnackbar("Playlist created", {variant: 'success', autoHideDuration: 2000});
            reset();
            revalidatePathAction("/playlists/my-playlists", "page");
            revalidatePathAction("/playlists/explore", "page");
        }).catch(_ => {
            enqueueSnackbar("Playlist can not be created", {variant: 'error', autoHideDuration: 3000});
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="card overflow-hidden bg-base-300 shadow-xl glass rounded-2xl">
            <form role="form" className="card-body m-1 pulsar-shadow text-white glass bg-base-300 shadow-2xl rounded-2xl w-80 md:w-96" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="divider divider-primary">{dictionary.forms.playlist.setup}</div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{dictionary.forms.playlist.title}</span>
                    </label>
                    <input type="text" placeholder={dictionary.forms.playlist.title} className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                        ...register("title", {
                            required: { value: true, message: dictionary.forms.playlist.required }
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
                    <span className="label-text">{dictionary.forms.playlist["public-available"]}</span>
                        <input type="checkbox" className="checkbox checkbox-primary" {
                            ...register("publiclyAvailable")
                        }/>
                    </label>
                </div>

                <div className="form-control mt-4">
                    <button className="btn btn-primary glass text-white" disabled={isLoading}>
                        {
                            isLoading && <span className="loading loading-dots loading-sm"></span>
                        }
                        {dictionary.forms.playlist.submit}
                    </button>
                </div>
            </form>
        </div>
    );
}
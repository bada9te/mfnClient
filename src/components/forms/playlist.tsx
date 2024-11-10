"use client"
import { revalidatePathAction } from "@/actions/revalidation";
import { getDictionary } from "@/dictionaries/dictionaries";
import { useAppSelector } from "@/lib/redux/store";
import { usePlaylistCreateMutation } from "@/utils/graphql-requests/generated/schema";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import { Text } from 'lucide-react';

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

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text-alt">{dictionary.forms.playlist.title}</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2 bg-base-300">
                        <input type="text" placeholder={dictionary.forms.playlist.title} className="placeholder:text-gray-200 grow"
                            {...register("title", {
                                required: { value: true, message: dictionary.forms.playlist.required }
                            })}
                        />
                        <Text/>
                    </label>
                    <div className="label">
                        {
                            errors.title &&
                            <span className="label-text-alt text-error">{errors.title.message}</span>
                        }
                    </div>
                </label>

                <div className="form-control">
                    <label className="label cursor-pointer">
                    <span className="label-text">{dictionary.forms.playlist["public-available"]}</span>
                        <input type="checkbox" className="checkbox" {
                            ...register("publiclyAvailable")
                        }/>
                    </label>
                </div>

                <div className="form-control mt-4">
                    <button disabled={isLoading} type="submit" className="glass group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                        {
                            isLoading && <span className="loading loading-dots loading-sm mx-2"></span>
                        }
                        {dictionary.forms.playlist.submit}
                    </button>
                </div>
            </form>
        </div>
    );
}
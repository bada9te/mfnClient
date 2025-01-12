"use client"
import { revalidatePathAction } from "@/app/utils/actions/revalidation";
import { getDictionary } from "@/app/translations/dictionaries";
import { useAppSelector } from "@/app/lib/redux/store";
import { usePlaylistCreateMutation } from "@/app/utils/graphql-requests/generated/schema";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import { Text } from 'lucide-react';
import MainButton from "@/app/[lang]/components/common/main-button/main-button";

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
        <div className="card overflow-hidden bg-base-100 rounded-2xl">
            <form role="form" className="card-body m-1 text-base-content  bg-base-100 rounded-2xl w-80 md:w-96" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="divider divider-primary">{dictionary.forms.playlist.setup}</div>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text-alt">{dictionary.forms.playlist.title}</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2 input-sm bg-base-200">
                        <input type="text" placeholder={dictionary.forms.playlist.title} className="placeholder:text-gray-200 grow"
                            {...register("title", {
                                required: { value: true, message: dictionary.forms.playlist.required }
                            })}
                        />
                        <Text size={16}/>
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
                    <MainButton disabled={isLoading} type="submit" color="primary">
                        {
                            isLoading && <span className="loading loading-dots loading-sm mx-2"></span>
                        }
                        {dictionary.forms.playlist.submit}
                    </MainButton>
                </div>
            </form>
        </div>
    );
}
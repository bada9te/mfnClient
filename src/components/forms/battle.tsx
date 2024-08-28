"use client"
import Post from "@/components/entities/post/post";
import InfoImage from "../common/info-image/info-image";
import { SubmitHandler, useForm } from "react-hook-form";
import SelectTrackModal from "../modals/select-track-modal";
import { useState } from "react";
import { Post as TPost, useBattleCreateMutation } from "@/utils/graphql-requests/generated/schema";
import { useSnackbar } from "notistack";
import { revalidatePathAction } from "@/actions/revalidation";
import { useAppSelector } from "@/lib/redux/store";
import { getDictionary } from "@/dictionaries/dictionaries";

const PostPlaceholder = (props: {
    handleSelect: (a: TPost) => void;
    userIsOwner: boolean;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) => {
    return (
        <div className="border-2 border-dashed border-white w-80 h-[535px] flex flex-col justify-center items-center glass relative rounded-2xl">
            <div className="flex flex-col h-full justify-center items-center">
                <InfoImage text={props.dictionary.forms.battle["select-track"]} image="/assets/icons/logo_clear.png"/>
            </div>
            <SelectTrackModal
                handleSelect={props.handleSelect}
                userIsOwner={props.userIsOwner}
                button={
                    <button type="button" className="mt-5 btn btn-sm btn-primary glass  absolute bottom-0 w-full text-white">{props.dictionary.forms.battle.select}</button>
                }
            />
        </div>
    );
}

type Inputs = {
    title: string;
}

export default function BattleForm({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const user = useAppSelector(state => state.user.user);
    const {register, reset, handleSubmit, formState: {errors}} = useForm<Inputs>();
    const [post1, setPost1] = useState<null | TPost>(null);
    const [post2, setPost2] = useState<null | TPost>(null);
    const { enqueueSnackbar } = useSnackbar();

    const [createBattle] = useBattleCreateMutation();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        if (!post1 || !post2) {
            enqueueSnackbar("You probably forgot to select the track", {variant: 'error', autoHideDuration: 3000});
            return;
        }

        enqueueSnackbar("Creating the battle...", { autoHideDuration: 1500 });
        createBattle({
            variables: {
                input: {
                    initiator: user?._id as string,
                    post1: post1._id,
                    post2: post2._id,
                    title: data.title,
                }
            }
        }).then(_ => {
            reset();
            setPost1(null);
            setPost2(null);
            enqueueSnackbar("Battle created", {autoHideDuration: 2000, variant: 'success'});
            revalidatePathAction('/battles/in-progress', 'page');
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {variant: 'error', autoHideDuration: 3000});
        });
    }

    return (
        <div className="card overflow-hidden bg-base-300 shadow-xl glass rounded-2xl">
            <div className="card-body m-1 pulsar-shadow text-white glass bg-base-300 shadow-2xl px-0 md:px-4 rounded-2xl">
                <div className="divider divider-primary px-4 md:px-0">{dictionary.forms.battle.setup}</div>
                <div className="flex flex-wrap gap-5 mt-5 w-full justify-around mb-10">
                    <div className="flex flex-col gap-3">
                        <p className='font-bold text-lg'>{dictionary.forms.battle["your-track"]}</p>
                        {
                            post1
                            ?
                            <Post data={post1} handleRemove={() => setPost1(null)}/>
                            :
                            <PostPlaceholder
                                userIsOwner={true}
                                handleSelect={setPost1}
                                dictionary={dictionary}
                            />
                        }
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className='font-bold text-lg'>{dictionary.forms.battle["opponents-track"]}</p>
                        {
                            post2
                            ?
                            <Post data={post2} handleRemove={() => setPost2(null)}/>
                            :
                            <PostPlaceholder
                                userIsOwner={false}
                                handleSelect={setPost2}
                                dictionary={dictionary}
                            />
                        }
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-control px-4 md:px-0">
                        <label className="label">
                            <span className="label-text">{dictionary.forms.battle["battle-title"]}</span>
                        </label>
                        <input 
                            type="text" 
                            placeholder={dictionary.forms.battle["battle-title"]}
                            className="input input-bordered shadow-md glass placeholder:text-gray-200" 
                            required
                            {...register("title", {
                                required: {value: true, message: dictionary.forms.battle["title-requited"]},
                                minLength: {value: 5, message: `${dictionary.forms.battle["min-length"]} 5`},
                                maxLength: {value: 20, message: `${dictionary.forms.battle["max-length"]} 20`}
                            })}
                        />
                        {
                            errors.title &&
                            <label className="label">
                                <span className="text-error">{errors.title.message}</span>
                            </label>
                        }
                    </div>

                    <div className="form-control mt-5 px-4 md:px-0">
                        <button type="submit" className="btn btn-primary glass text-white">{dictionary.forms.battle.create}</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
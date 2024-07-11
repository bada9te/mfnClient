"use client"
import {genres} from "@/config/categories";
import {SubmitHandler, useForm} from "react-hook-form";
import {enqueueSnackbar, useSnackbar} from "notistack";
import {httpSaveFile, httpSaveFileMultiple} from "@/utils/http-requests/files";
import {Post, PostsByOwnerQuery, PostsQuery, usePostCreateMutation} from "@/utils/graphql-requests/generated/schema";
import {POSTS_BY_OWNER_QUERY, POSTS_QUERY} from "@/utils/graphql-requests/posts";
import {useAppSelector} from "@/lib/redux/store";
import {useRouter} from "next/navigation";

type Inputs = {
    title: string;
    description: string;
    image: File[];
    audio: File[];
    genre: string;
    downloadsAllowed: boolean;
}

export default function PostUploadForm() {
    const { formState: {errors}, register, handleSubmit, reset } = useForm<Inputs>()
    const { enqueueSnackbar } = useSnackbar();
    const [ createPost ] = usePostCreateMutation();
    const currentUser = useAppSelector(state => state.user.user);
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        enqueueSnackbar("Uploading...", { autoHideDuration: 1500 });
        let uploadedAudioName, uploadedImageName;

        await Promise.all([
            httpSaveFile(data?.audio?.[0] as File).then(({data}) => {
                uploadedAudioName = data.data.filename;
            }).catch(err => {
                enqueueSnackbar(err.response.data.message, { variant: 'error', autoHideDuration: 3000 });
            }),
            httpSaveFile(data?.image?.[0] as File).then(({data}) => {
                uploadedImageName = data.data.filename;
            }).catch(err => {
                enqueueSnackbar(err.response.data.message, { variant: 'error', autoHideDuration: 3000 });
            }),
        ]);

        // upload the post itself
        await createPost({
            variables: {
                input: {
                    owner:            currentUser?._id as string,
                    title:            data.title,
                    description:      data.description,
                    audio:            uploadedAudioName as unknown as string,
                    image:            uploadedImageName as unknown as string,
                    downloadsAllowed: data.downloadsAllowed,
                    category:         data.genre,
                },
            },
            update: (cache, { data }) => {
                const postData = JSON.parse(JSON.stringify(data?.postCreate));
                postData.owner = {
                    _id: currentUser?._id,
                    avatar: currentUser?.avatar,
                    nick: currentUser?.nick,
                };

                // function to update array of posts
                const updatePosts = (cachedArray: Post[], post: Post) => {
                    const cachedPosts = JSON.parse(JSON.stringify(cachedArray));
                    if (cachedPosts.length >= 12) {
                        cachedPosts.pop();
                    }
                    cachedPosts.unshift(post);
                    return cachedPosts;
                };

                // update owner posts query
                const cachedData = cache.readQuery({
                    query: POSTS_BY_OWNER_QUERY,
                    variables: { owner: currentUser?._id, offset: 0, limit: 12 }
                }) as PostsByOwnerQuery;
                if (cachedData) {
                    const posts = updatePosts(cachedData.postsByOwner.posts as Post[], postData);
                    cache.writeQuery({
                        query: POSTS_BY_OWNER_QUERY,
                        variables: { owner: currentUser?._id, offset: 0, limit: 12 },
                        data: {
                            postsByOwner: { posts, count: posts.length + 1 }
                        }
                    });
                }

                // update default posts query
                const postsCachedData = cache.readQuery({
                    query: POSTS_QUERY,
                    variables: { offset: 0, limit: 12 }
                }) as PostsQuery;
                if (postsCachedData) {
                    const posts = updatePosts(postsCachedData.posts.posts as Post[], postData);
                    cache.writeQuery({
                        query: POSTS_QUERY,
                        variables: { offset: 0, limit: 12 },
                        data: {
                            posts: { posts, count: posts.length + 1 }
                        }
                    });
                }
            }
        }).then(() => {
            reset();
            enqueueSnackbar("Post created", { autoHideDuration: 1500, variant: 'success' });
            router.replace(`/profile/me/1`)
        }).catch(() => {
            enqueueSnackbar("Post can not be uploaded", { autoHideDuration: 3000, variant: 'error' });
        });
    }

    return (
        <form className="card-body text-white glass bg-gray-950 rounded-2xl shadow-2xl" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="divider divider-primary">Post stup</div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Track title</span>
                </label>
                <input type="text" placeholder="Track title" className="input input-bordered shadow-md" {
                    ...register("title", {
                        maxLength: { value: 15, message: "Max length must be 15" },
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
                <label className="label">
                    <span className="label-text">Track description</span>
                </label>
                <input type="text" placeholder="Track description" className="input input-bordered shadow-md" {
                    ...register("description", {
                        maxLength: { value: 25, message: "Max length must be 25" },
                        required: { value: true, message: "This field is required" }
                    })
                }/>
                {
                    errors.description &&
                    <label className="label">
                        <span className="label-text text-error">{errors.description.message}</span>
                    </label>
                }
            </div>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Track image</span>
                    <span className="label-text-alt">.jpg, .png</span>
                </div>
                <input type="file" className="file-input file-input-bordered w-full" {
                    ...register("image", {
                        required: { value: true, message: "This field is required" }
                    })
                }/>
                {
                    errors.image &&
                    <label className="label">
                        <span className="label-text text-error">{errors.image.message}</span>
                    </label>
                }
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Track audio</span>
                    <span className="label-text-alt">.mp3, .wav</span>
                </div>
                <input type="file" className="file-input file-input-bordered w-full" {
                    ...register("audio", {
                        required: { value: true, message: "This field is required" }
                    })
                }/>
                {
                    errors.audio &&
                    <label className="label">
                        <span className="label-text text-error">{errors.audio.message}</span>
                    </label>
                }
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Genre</span>
                </div>
                <select className="select select-bordered" {
                    ...register("genre", {
                        required: { value: true, message: "This field is required" }
                    })
                }>
                    {
                        genres.map((gen, key) => {
                            return <option key={key} value={gen.title}>{gen.title}</option>
                        })
                    }
                </select>
            </label>

            <div className="form-control mt-4">
                <label className="label cursor-pointer">
                    <span className="label-text">Downloads allowed</span>
                    <input type="checkbox" className="checkbox checkbox-primary" {
                        ...register("downloadsAllowed")
                    }/>
                </label>
            </div>

            <div className="form-control mt-4">
                <button className="btn btn-primary glass bg-pink-500">Upload</button>
            </div>
        </form>
    );
}
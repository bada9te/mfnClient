import PostUploadForm from "@/components/forms/post-upload";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";

export default function UploadNewPost() {
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/newPostFormBG.png')] bg-right"
            title="New post"
            description="Upload the new post"
        >
            <PostUploadForm/>
        </HeroWrapperForm>
    );
}
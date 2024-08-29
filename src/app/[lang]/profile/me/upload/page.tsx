import PostUploadForm from "@/components/forms/post-upload";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/dictionaries/dictionaries";
import { TLang } from "@/types/language";

export default async function UploadNewPost({params}: {params: {lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/newPostFormBG.png')] bg-right"
            title={dict.app.profile.me.upload.title}
            description={dict.app.profile.me.upload.description}
        >
            <PostUploadForm dictionary={dict.components}/>
        </HeroWrapperForm>
    );
}
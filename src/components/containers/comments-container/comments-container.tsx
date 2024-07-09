import Comment from "@/components/entities/comment/comment";

export default function CommentsContainer() {
    return (
        <div className="flex flex-col gap-2 w-full">
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
            <Comment/>
        </div>
    );
}
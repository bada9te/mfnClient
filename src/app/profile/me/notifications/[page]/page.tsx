import Pagination from "@/components/pagination/pagination";

export default function Notifications({params}: {params: { page: number }}) {
    return (
        <>
            NOTIFICATIONS
            <Pagination/>
        </>
    );
}
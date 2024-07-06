"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidateTagAction(tag: string) {
    revalidateTag(tag);
}

export async function revalidatePathAction(path: string, type: "page" | "layout") {
    revalidatePath(path, type);
}
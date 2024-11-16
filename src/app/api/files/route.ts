import envCfg from "@/config/env";
import { pinata } from "@/utils/ipfs/config";
import { readFileSync } from "fs";
import { NextResponse, type NextRequest } from "next/server";
import path from "path";


export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;
    const groupId: string | null = data.get("groupId") as string;

    const filteredGroupsByName = await pinata.groups
      .list()
      .name(groupId)
      .limit(1);

    const uploadData = await pinata.upload.file(file, {
      groupId: filteredGroupsByName.groups[0].id
    });
    return NextResponse.json(uploadData.cid, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cid = searchParams.get('cid');

    if (!cid) {
      return NextResponse.json(
        { error: 'CID parameter is required' },
        { status: 400 }
      );
    }

    const files = await pinata.files.list().cid(cid);
    
    const signedUrl = await pinata.gateways.createSignedURL({
      cid: files.files.length ? cid : 'bafybeifavtlbmv2z2adedg7ngfdiqbgnwzbkcvkyrerbh636akcrq6ki7u',
      expires: 30,
    });

    // Send the stream with headers
    return NextResponse.json(signedUrl, { status: 200 });
  } catch (e) {
    console.error('Error handling file request:', e);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.formData();
    const cid: string | null = data.get("cid") as string;

    if (!cid) {
      return NextResponse.json(
        { error: "CID parameter is required" },
        { status: 400 }
      );
    }

    const unpin = await pinata.files.delete([
      cid
    ]);
    const responseID = unpin[0].id;
    return NextResponse.json(responseID, { status: 200 });
  } catch (e) {
    console.error("Error deleting file:", e);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
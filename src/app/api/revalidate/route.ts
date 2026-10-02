import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

const secret = process.env.SANITY_REVALIDATE_SECRET;

export async function POST(request: NextRequest) {
  if (!secret) {
    return NextResponse.json({ error: "SANITY_REVALIDATE_SECRET is not configured" }, { status: 500 });
  }

  try {
    const { body, isValidSignature } = await parseBody<{
      _type?: string;
      slug?: { current?: string };
      document?: { _type?: string; _id?: string };
    }>(request, secret);

    if (!isValidSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const documentType = body?._type || body?.document?._type || "siteSettings";
    const tags = Array.from(new Set([
      documentType,
      "siteSettings",
      "skill",
      "skillCategory",
      "project",
      "projects",
      "blog",
      "blogPost",
      "resume",
      "general",
    ]));

    for (const tag of tags) {
      revalidateTag(tag, "default");
    }

    return NextResponse.json({ revalidated: true, type: documentType, tags });
  } catch (error) {
    console.error("Sanity revalidation failed", error);
    return NextResponse.json({ error: "Revalidation failed" }, { status: 400 });
  }
}

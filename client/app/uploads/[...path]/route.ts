import { NextRequest, NextResponse } from "next/server";

const UPLOAD_BASE =
    process.env.NODE_ENV === "production"
        ? "https://openpc.uz/uploads/"
        : "http://localhost:3001/uploads/";

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const filePath = path.map((segment) => decodeURIComponent(segment)).join("/");
    const target = UPLOAD_BASE + filePath;

    const upstream = await fetch(target);

    if (!upstream.ok) {
        return new NextResponse(null, { status: upstream.status });
    }

    const body = await upstream.arrayBuffer();
    const contentType =
        upstream.headers.get("content-type") ?? "application/octet-stream";

    return new NextResponse(body, {
        status: 200,
        headers: {
            "Content-Type": contentType,
            "Cache-Control": "public, max-age=31536000, immutable",
            "Cross-Origin-Resource-Policy": "cross-origin",
            "Access-Control-Allow-Origin": "*",
        },
    });
}

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {

        if (!params.sizeId) {
            return new NextResponse("Size ID is Required", { status: 400 })
        }

        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId,
            },
        });

        return NextResponse.json(size);

    } catch (error) {
        console.log('[INDIVIDUAL_SIZE_GET]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {

        const { userId } = auth();
        const body = await req.json();

        const { name, value } = body;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!name) {
            return new NextResponse("name is Required", { status: 400 })
        }

        if (!value) {
            return new NextResponse("Image URL is Required", { status: 400 })
        }

        if (!params.sizeId) {
            return new NextResponse("SIZE ID is Required", { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            }
        })

        if (!storeByUserId) {
            return new NextResponse("UnAuthorized to access store", { status: 403 })
        }


        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizeId
            },
            data: {
                name,
                value
            }
        });

        return NextResponse.json(size);

    } catch (error) {
        console.log('[SIZE_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string, sizeId: string } }
) {
    try {

        const { userId } = auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params.sizeId) {
            return new NextResponse("SIZE ID is Required", { status: 400 })
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId,
            }
        })

        if (!storeByUserId) {
            return new NextResponse("UnAuthorized to access store", { status: 403 })
        }

        const size = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId,
            },
        });

        return NextResponse.json(size);

    } catch (error) {
        console.log('[INDIVIDUAL_SIZE_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
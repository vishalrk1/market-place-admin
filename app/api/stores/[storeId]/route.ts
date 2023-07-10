import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { string } from "zod"

export async function PATCH(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        const { userId } = auth();
        const body = await req.json();

        const { name } = body;

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!name) {
            return new NextResponse("Store Name is Required", { status: 400 })
        }

        if (!params.storeId) {
            return new NextResponse("Store ID is Required", { status: 400 })
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId,
            },
            data: {
                name
            }
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log('[INDIVIDUAL_STORE_PATCH]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {

        const { userId } = auth();

        console.log("We are here")

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (!params.storeId) {
            return new NextResponse("Store ID is Required", { status: 400 })
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId,
            },
        });

        return NextResponse.json(store);

    } catch (error) {
        console.log('[INDIVIDUAL_STORE_DELETE]', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
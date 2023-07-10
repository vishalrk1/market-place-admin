import prismadb from '@/lib/prismadb'
import React from 'react'
import BillboardForm from './components/billboard-form';

const BillboardPage = async ({
    params
}: {
    params: {billboardId: string}
}) => {

    // finding billboard if it exists
    const billboard = await prismadb.billboard.findUnique({
        where: {
            id: params.billboardId,
        }
    });

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-5'>
                <BillboardForm initialData={billboard}/>
            </div>
        </div>
    )
}

export default BillboardPage
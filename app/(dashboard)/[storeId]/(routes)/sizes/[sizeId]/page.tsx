import prismadb from '@/lib/prismadb'
import React from 'react'
import SizeForm from './components/size-form';

const SizePage = async ({
    params
}: {
    params: {sizeId: string}
}) => {

    // finding billboard if it exists
    const size = await prismadb.size.findUnique({
        where: {
            id: params.sizeId,
        }
    });

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-5'>
                <SizeForm initialData={size}/>
            </div>
        </div>
    )
}

export default SizePage
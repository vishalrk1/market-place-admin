import prismadb from '@/lib/prismadb'
import React from 'react'
import CategoryForm from './components/category-form';

const BillboardPage = async ({
    params
}: {
    params: {categoryId: string,storeId: string}
}) => {

    // finding billboard if it exists
    const category = await prismadb.category.findUnique({
        where: {
            id: params.categoryId,
        }
    });

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeId,
        }
    })

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-5'>
                <CategoryForm initialData={category} billboards={billboards}/>
            </div>
        </div>
    )
}

export default BillboardPage
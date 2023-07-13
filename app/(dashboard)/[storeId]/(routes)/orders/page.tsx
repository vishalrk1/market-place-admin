import React from 'react'
import { format } from 'date-fns';
import { OrderClient } from './components/client'
import prismadb from '@/lib/prismadb'
import { OrderColumn } from './components/columns'
import { formatter } from '@/lib/utils';

const OrdersPage = async ({
    params
}: {
    params: { storeId: string }
}) => {
    // extracting all billboards 
    const orders = await prismadb.order.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            orderItems: {
                include: {
                    product: true
                }
            }
        },
        orderBy: {
            createdAt: 'desc',
        }
    })

    // formatting all orders to show in data columns
    const formattedOrders : OrderColumn[] = orders.map((item) => ({
        id: item.id,
        phone: item.phone,
        address: item.address,
        isPaid: item.isPaid,
        products: item.orderItems.map((orderItme) => orderItme.product.name).join(', '),
        totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
            return total + Number(item.product.price)
        }, 0)),
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }));

    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
                <OrderClient data={formattedOrders} />
            </div>
        </div>
    )
}

export default OrdersPage
import { Button } from "@/components/ui/button";
import { CategoryColumn } from "./columns";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
    data: CategoryColumn
}

export const CellAction: React.FC<CellActionProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    // function to copy
    const onCopy = (billboardId: string) => {
        navigator.clipboard.writeText(billboardId);
        toast.success("Category ID copied to clipboard");
    }

    // function to delete billboard from table
    const onDelete = async () => {
        try{
            
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/categories/${data.id}`);
            router.refresh();
            router.push(`/${params.storeId}/categories`);
            toast.success("Category removed sucessfully");

        }catch(error) {
            toast.error('Make sure you removed all categories')
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
        <AlertModal 
            isOpen={open}
            loading={loading}
            onClose={()=>setOpen(false)}
            onConfirm={onDelete}
        />
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open Menu</span>
                    <MoreHorizontal className="h-4 2-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>
                    Actions
                </DropdownMenuLabel>
                <DropdownMenuItem onClick={()=> onCopy(data.id)}>
                    <Copy className="mr-2 h-4 w-4"/>
                    Copy ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push(`/${params.storeId}/categories/${data.id}`)}>
                    <Edit className="mr-2 h-4 w-4"/>
                    Update
                </DropdownMenuItem>
                <DropdownMenuItem onClick={()=>setOpen(true)}>
                    <Trash className="mr-2 h-4 w-4"/>
                    Delete
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
};
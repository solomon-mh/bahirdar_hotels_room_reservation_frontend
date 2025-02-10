import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export type FeatureDeleteActionType = () => [unknown, { isLoading: boolean }]
interface Props {
    useDelete: FeatureDeleteActionType;
    feature: string;
    featureId: string;
    redirectUrl?: string;
}
export default function DeleteFeature({ useDelete, feature, featureId, redirectUrl }: Props) {
    const [deleteFeature, { isLoading, }] = useDelete() as [(id: string) => Promise<unknown>, { isLoading: boolean }];
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const onConfirm = () => {
        try
        {

            deleteFeature(featureId).then(() => {
                toast.success(`${feature} deleted successfully`);
                setIsOpen(false);
                navigate(redirectUrl || '/dashboard/hotels');
            }).catch((err) => {
                if ('data' in err)
                {
                    toast.error(err.data.message);
                }
                else
                {
                    toast.error(JSON.stringify(err, null, 2));
                }
            })
        } catch (error)
        {
            toast.error(JSON.stringify(error, null, 2));

        }
    };



    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <button className="px-4 py-1  border bg-[#34343400] border-red-500 text-red-500 hover:bg-red-500 rounded-md hover:text-slate-100">
                    Delete 
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-sm bg-slate-200">
                <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                </DialogHeader>
                <p className="text-gray-600">
                    Are you sure you want to delete this hotel? This action cannot be undone.
                </p>
                <DialogFooter>
                    <button
                        disabled={isLoading}
                        onClick={() => setIsOpen(false)}
                        className="px-4 py-2 disabled:cursor-not-allowed bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        disabled={isLoading}
                        onClick={() => {
                            onConfirm();
                            setIsOpen(false);
                        }}
                        className="px-4 py-2 disabled:cursor-not-allowed text-slate-100 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                        Delete
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

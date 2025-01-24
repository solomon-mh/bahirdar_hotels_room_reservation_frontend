import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props {
    useDelete: () => [unknown, { isLoading: boolean }];
    feature: string;
    featureId: string;
}
export default function DeleteFeature({ useDelete, feature, featureId }: Props) {
    const [deleteFeature, { isLoading }] = useDelete() as [(id: string) => Promise<unknown>, { isLoading: boolean }];
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();
    const onConfirm = () => {
        try
        {

            deleteFeature(featureId).then(() => {
                toast.success(`${feature} deleted successfully`);
                setIsOpen(false);
                navigate('/dashboard/hotels');
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
                <button className="px-4 py-2 bg-slate-100 border  border-red-500 text-white rounded-md hover:border-2">
                    Delete Hotel
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

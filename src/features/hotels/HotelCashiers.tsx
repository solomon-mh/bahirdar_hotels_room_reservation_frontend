import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Search from "../../ui/Search";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { CustomPagination } from "@/components/Pagination";
import { useCreateCashierMutation, useGetHotelCashiersQuery } from "@/redux/api/hotelApi";
import { useState } from "react";
import { IUser } from "@/types/userTypes";
import { useAuthContext } from "@/context/AuthContext";
import { AddCashier } from "./components/AddCashier";
import toast from "react-hot-toast";

function HotelCashiers() {
    const navigate = useNavigate()
    const { user } = useAuthContext()
    const [selectedCashier, setSelectedCashier] = useState<IUser | null>(null)
    const [searchParams] = useSearchParams();
    const { data: { data: cashiers, pagination } = {}, isLoading } = useGetHotelCashiersQuery({ params: searchParams.toString(), hotelId: user?.hotel?._id || "" }, { refetchOnMountOrArgChange: true });
    const [addCashier, { isLoading: adding }] = useCreateCashierMutation();

    const handleAddCashier = () => {
        addCashier({
            hotelId: user?.hotel?._id as string,
            userId: selectedCashier?._id as string
        }).unwrap().then(() => {
            setSelectedCashier(null)
            toast.success("Cashier added successfully")
            navigate("/dashboard/cashiers")
        }).catch((err) => {
            if ('data' in err)
            {
                const { message } = err.data as { message: string }
                toast.error(message || "Failed to add cashier")
            }
            else
            {
                toast.error("Failed to add cashier please try again")
            }
        })
    }
    return (
        <div className="w-full bg-white  text-gray-600 shadow-md">
            <div className="flex items-center justify-between p-6">
                <h1 className="p-4 uppercase">
                    <Link to="/dashboard/cashiers">All Cashiers</Link>
                </h1>

                {/* SEARCH  */}
                <Search />

                <div className="flex items-center justify-between gap-2">
                    <AddCashier
                        selectedCashier={selectedCashier}
                        setSelectedCashier={setSelectedCashier}
                    />
                    {
                        selectedCashier && (
                            <div className="flex items-stretch gap-2 p-3 flex-col md:flex-row md:items-center">
                                <span>
                                    {selectedCashier?.firstName} {selectedCashier?.lastName}
                                </span>
                                <button
                                    className="px-4 py-1 border bg-[#34343400] border-accent-500 text-accent-500 hover:bg-accent-500 rounded-md hover:text-slate-100"
                                    onClick={() => setSelectedCashier(null)}
                                >
                                    Cancel
                                </button>
                            </div>
                        )
                    }
                    {selectedCashier && <button
                        disabled={!selectedCashier || adding}
                        className="px-4 py-1 border bg-[#34343400] border-accent-500 text-accent-500 hover:bg-accent-500 rounded-md hover:text-slate-100"
                        onClick={handleAddCashier}
                    >
                        Save
                    </button>}
                </div>
            </div>


            {isLoading
                ?
                (
                    <LoadingPage />
                )
                :
                !cashiers?.length ?
                    (
                        <NotFoundPage >
                            <p>Cashiers not found</p>
                        </NotFoundPage>
                    )
                    :
                    (
                        <div className="flex p-4 flex-col gap-2">

                            <Table className="shadow-md shadow-red-300">
                                <TableHeader className="bg-slate-200">
                                    <TableHead>Profile</TableHead>
                                    <TableHead>First Name</TableHead>
                                    <TableHead>Last Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone number</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableHeader>
                                <TableBody className="divide-y divide-gray-200">
                                    {
                                        cashiers?.map((user) => (
                                            <TableRow>
                                                <TableCell>
                                                    {
                                                        user?.profilePicture
                                                            ? <img
                                                                src={user?.profilePicture}
                                                                alt="profile"
                                                                className="w-7 h-7 rounded-full"
                                                            />
                                                            : <div className="w-7 h-7 grid place-items-center" >
                                                                No profile picture
                                                            </div>
                                                    }
                                                </TableCell>
                                                <TableCell>{user?.firstName}</TableCell>
                                                <TableCell>{user?.lastName}</TableCell>
                                                <TableCell>{user?.email}</TableCell>
                                                <TableCell>{user?.phoneNumber}</TableCell>
                                                <TableCell>{user?.role}</TableCell>
                                                <TableCell>
                                                    <button
                                                        className="text-accent-500 hover:underline"
                                                        onClick={() => {
                                                            navigate(`/dashboard/cashiers/${user._id}`)
                                                        }}
                                                    >
                                                        View
                                                    </button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                            {
                                pagination && (
                                    <CustomPagination
                                        page={pagination?.page}
                                        totalPages={pagination?.totalPages}
                                    />
                                )
                            }
                        </div>
                    )
            }
        </div>
    );
}

export default HotelCashiers;

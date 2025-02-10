"use client"
import { useState } from "react";
import { Button } from "../../components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../../components/ui/drawer"
import { useGetAllUsersQuery } from "../../redux/api/userApi";
import Spinner from "../../ui/Spinner";
import { IUser } from "../../types/userTypes";
interface Props {
    selectedManager: IUser | null;
    setSelectedManager: (manager: IUser | null) => void;
}
export function SelectManager({ selectedManager, setSelectedManager }: Props) {


    const [open, setOpen] = useState(false);

    const { data, isLoading, error } = useGetAllUsersQuery("");

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <button className="px-4 py-1  border bg-[#34343400] border-accent-500 text-accent-500 hover:bg-accent-500 rounded-md hover:text-slate-100">
                    {selectedManager ? "Change Manager" : "Select manager"}
                </button>
            </DrawerTrigger>
            <DrawerContent className="bg-slate-200 h-[60vh]  pb-6 text-slate-900 dark:bg-slate-950 dark:text-slate-50">
                <DrawerHeader>
                    <DrawerTitle>List of hotel managers</DrawerTitle>
                    <DrawerDescription>Select the hotel menager </DrawerDescription>
                </DrawerHeader>

                {
                    isLoading ? (
                        <div className="p-4 text-center">
                            <Spinner />
                        </div>
                    )
                        :
                        error ? (
                            <div className="p-4 text-center">
                                <p className="text-red-500">Failed to load users</p>
                            </div>
                        )
                            : !data?.data?.length ? (
                                <div className="p-4 text-center">
                                    <p className="text-red-500">No users found</p>
                                </div>
                            )

                                : (
                                    <div className="p-4 h-[50vh] overflow-y-scroll">
                                        {data.data?.map((user) => (
                                            <div onClick={() => {
                                                if (selectedManager?._id === user._id)
                                                    setSelectedManager(null);
                                                else
                                                    setSelectedManager(user);
                                            }}
                                                key={user._id} className={"flex items-center p-3 transition-all duration-300 hover:cursor-pointer hover:bg-slate-300" + (selectedManager?._id === user._id ? " border-b-2 border-b-accent-500" : "")}>
                                                <div>
                                                    <img src={user.profilePicture || "/user1.jpeg"} alt="" className="mr-2 h-12 w-12 rounded-full object-cover" />
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <h2 className="">
                                                        {user.firstName} {user.lastName}{" "}
                                                        <span className="text-xs text-slate-500">({user.email})</span>
                                                    </h2>
                                                    <p className=" text-slate-500">
                                                        {user.phoneNumber}{" "}
                                                        <span className="text-xs text-slate-500">({user.role})</span>
                                                    </p>
                                                </div>
                                                <div className="flex items-center  px-10  self-end justify-end flex-1">
                                                    <button
                                                        className={"py-2 bg-accent-500 text-slate-200 px-6 rounded-md  hover:text-slate-50"}
                                                    >
                                                        Select{selectedManager?._id === user._id ? "ed" : ""}
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )
                }

                <DrawerFooter className="flex flex-row justify-end gap-4">
                    <DrawerClose className="flex" asChild
                    >
                        <Button
                            onClick={() => {
                                setOpen(false);
                            }}
                            className="w-full py-2 hover:bg-slate-100 bg-slate-100/90"
                            variant="outline"
                        >
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

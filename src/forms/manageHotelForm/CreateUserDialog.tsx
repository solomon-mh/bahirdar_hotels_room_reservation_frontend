import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog";

import { useForm, Controller } from 'react-hook-form';
import { IUser } from '../../types/userTypes';
import { DatePicker } from "../components/datePicker";
import { useCreateUserMutation } from "../../redux/api/userApi";
import { toast } from "react-toastify";
import { Gender } from "../../enums/genderEnum";
import { Role } from "../../enums/roleEnum";
import SpinnerMini from "../../ui/SpinnerMini";
import { useState } from "react";
const CreateUserDialog = () => {

    const [open, setOpen] = useState(false)
    const [createUser, { isLoading }] = useCreateUserMutation()
    const { control, handleSubmit, formState: { errors } } = useForm<IUser>({
        defaultValues: {
            role: Role.MANAGER
        }
    });

    const genders = Object.values(Gender)

    const onSubmit = (data: IUser) => {

        const formData = new FormData();
        formData.append("firstName", data.firstName)
        formData.append("lastName", data.lastName)
        formData.append("username", data.username)
        formData.append("dateOfBirth", data.dateOfBirth.toString())
        formData.append("gender", data.gender)
        formData.append("email", data.email)
        formData.append("phoneNumber", data.phoneNumber)
        formData.append("address", "{}")
        formData.append("address.city", data.address.city)
        formData.append("address.subcity", data.address.subcity)
        formData.append("address.woreda", data.address.woreda)
        formData.append("address.street", data.address.street)
        if (data.profilePicture)
            formData.append("profilePicture", data.profilePicture)
        try
        {
            createUser(data).unwrap().then(() => {
                setOpen(false)
                toast.success("User successfully registered!!!")
            }).catch(err => {
                if ('data' in err)
                {
                    const { message } = err.data as { message: string }
                    toast.error(message || "Something went to wrong")
                }
                else
                {
                    toast.error("Failed to register user")
                }
            })
        } catch (error)
        {
            toast.error(JSON.stringify(error, null, 2))
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild>
                <button className="px-4 py-1  border bg-[#34343400] border-accent-500 text-accent-500 hover:bg-accent-500 rounded-md hover:text-slate-100">
                    Create Manager
                </button>
            </DialogTrigger>
            <DialogContent className="min-w-[70vw] p-6 max-h-[80vh] bg-slate-200">
                <DialogHeader>
                    <DialogTitle>Create user</DialogTitle>
                    <DialogDescription>
                        Please fill the form below to create user account.
                    </DialogDescription>
                </DialogHeader>

                <div className=" py-6 bg-white rounded-lg ">

                    <form onSubmit={handleSubmit(onSubmit)} className=" grid grid-cols-1 p-3 md:grid-cols-3 gap-4">
                        {/* First Name */}
                        <div className="space-y-1">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                            <Controller
                                name="firstName"
                                control={control}
                                rules={{ required: 'First name is required' }}
                                render={({ field }) => (
                                    <input
                                        id="firstName"
                                        type="text"
                                        {...field}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                )}
                            />
                            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName.message}</p>}
                        </div>

                        {/* Last Name */}
                        <div className="space-y-1">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                            <Controller
                                name="lastName"
                                control={control}
                                rules={{ required: 'Last name is required' }}
                                render={({ field }) => (
                                    <input
                                        id="lastName"
                                        type="text"
                                        {...field}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                )}
                            />
                            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName.message}</p>}
                        </div>

                        {/* Username */}
                        <div className="space-y-1">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <Controller
                                name="username"
                                control={control}
                                rules={{ required: 'Username is required' }}
                                render={({ field }) => (
                                    <input
                                        id="username"
                                        type="text"
                                        {...field}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                )}
                            />
                            {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-1">
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <Controller
                                name="dateOfBirth"
                                control={control}

                                render={({ field }) => (
                                    <DatePicker
                                        date={field.value}
                                        setDate={field.onChange}
                                    />
                                )}
                            />
                        </div>

                        {/* Gender */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-gray-700">Gender</label>
                            <Controller
                                name="gender"
                                control={control}
                                render={({ field }) => (
                                    <select
                                        defaultValue={genders[0]}
                                        {...field}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {
                                            genders.map(gender => (
                                                <option key={gender} value={gender}>{gender}</option>
                                            ))
                                        }
                                    </select>
                                )}
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-1">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Controller
                                name="email"
                                control={control}
                                rules={{
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                        message: 'Please enter a valid email address'
                                    }
                                }}
                                render={({ field }) => (
                                    <input
                                        id="email"
                                        type="email"
                                        {...field}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                )}
                            />
                            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1">
                            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        id="phoneNumber"
                                        type="tel"
                                        {...field}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                )}
                            />
                        </div>

                        {/* Address */}

                        <div className="space-y-1">
                            <label htmlFor="address.city" className="block text-sm font-medium text-gray-700">City</label>
                            <Controller
                                name="address.city"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        id="address.city"
                                        type="text"
                                        {...field}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                )}
                            />
                        </div>

                        <div className="space-y-1">
                            <label htmlFor="address.subcity" className="block text-sm font-medium text-gray-700">Sub city</label>
                            <Controller
                                name="address.subcity"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        id="address.subcity"
                                        type="text"
                                        {...field}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                )}
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="address.woreda" className="block text-sm font-medium text-gray-700">Woreda</label>
                            <Controller
                                name="address.woreda"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        id="address.woreda"
                                        type="text"
                                        {...field}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                )}
                            />
                        </div>
                        <div className="space-y-1">
                            <label htmlFor="address.street" className="block text-sm font-medium text-gray-700">Street</label>
                            <Controller
                                name="address.street"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        id="address.street"
                                        type="text"
                                        {...field}
                                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                )}
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            disabled={isLoading}
                            type="submit"
                            className="col-span-3 text-slate-100 bg-accent-500 text-white p-2 rounded-md hover:bg-accent-500"
                        >
                            {
                                isLoading ? <SpinnerMini /> : " Create User"
                            }
                        </button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>

    );
};

export default CreateUserDialog;

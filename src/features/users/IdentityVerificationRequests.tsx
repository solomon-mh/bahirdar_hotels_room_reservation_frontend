import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoadingPage from "@/pages/utils/LoadingPage";
import { useVerificationRequestedUsersQuery } from "@/redux/api/userApi";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

function IdentityVerificationRequests() {
  const navigate = useNavigate();
  const {
    data: { data } = {},
    isLoading,
    isError,
    error,
  } = useVerificationRequestedUsersQuery();

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch identity verification requests");
      console.log(error);
      navigate("/dashboard");
    }
  }, [isError, error]);

  if (isLoading) {
    return <LoadingPage />;
  }

  console.log(data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Identity Verification Requests</CardTitle>
        <CardDescription>
          <p>Here you can view and approve identity verification requests.</p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
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
              {data?.map((user) => (
                <TableRow>
                  <TableCell>
                    {user?.profilePicture ? (
                      <img
                        src={user?.profilePicture}
                        alt="profile"
                        className="h-7 w-7 rounded-full"
                      />
                    ) : (
                      <div className="grid h-7 w-7 place-items-center">
                        No profile picture
                      </div>
                    )}
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
                        navigate(
                          `/dashboard/identity-verification-requests/${user._id}`,
                        );
                      }}
                    >
                      View
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default IdentityVerificationRequests;

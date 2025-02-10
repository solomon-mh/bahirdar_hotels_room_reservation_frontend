import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useAuthContext } from "@/context/AuthContext";

export default function UserProfile() {
  const { user } = useAuthContext()
  if (!user)
  {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="p-6 shadow-lg rounded-2xl">
          <h1 className="text-2xl font-semibold">User not found</h1>
        </Card>
      </div>
    )
  }
  return (
    <div className="w-full  p-6">
      <Card className="p-6 shadow-lg shadow-slate-200 rounded-lg">
        <div className="flex items-center gap-6">
          <Avatar className="w-24 h-24">
            <img src={user.profilePicture} alt={user.firstName} className="rounded-full" />
          </Avatar>
          <div>
            <h1 className="text-2xl font-semibold">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-gray-500">@{user.username}</p>
            <Badge className="mt-2 bg-blue-100 text-blue-600">{user.role}</Badge>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-4">
            <CardContent>
              <h2 className="text-lg font-semibold">Personal Information</h2>
              <p>Email: <span className="font-medium">{user.email}</span></p>
              <p>Phone: <span className="font-medium">{user.phoneNumber}</span></p>
              <p>Date of Birth: <span className="font-medium">{new Date(user.dateOfBirth).toLocaleDateString()}</span></p>
              <p>Gender: <span className="font-medium">{user.gender}</span></p>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardContent>
              <h2 className="text-lg font-semibold">Address</h2>
              <p>City: <span className="font-medium">{user.address.city}</span></p>
              <p>Subcity: <span className="font-medium">{user.address.subcity}</span></p>
              <p>Woreda: <span className="font-medium">{user.address.woreda}</span></p>
              <p>Street: <span className="font-medium">{user.address.street}</span></p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" className="flex items-center gap-2">
            <Pencil size={16} /> Edit Profile
          </Button>
        </div>
      </Card>
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeclineVerificationRequestMutation,
  useGetUserByIdQuery,
  useVerifyUserAccountMutation,
} from "../../redux/api/userApi";
import LoadingPage from "../../pages/utils/LoadingPage";
import NotFoundPage from "../../pages/utils/NotFoundPage";
import { ArrowLeft } from "lucide-react";
import ModalImage from "react-modal-image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import SpinnerMini from "@/ui/SpinnerMini";
import { useEffect } from "react";
import toast from "react-hot-toast";

function UserDetailForVerification() {
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();
  const {
    data: { data: user } = {},
    isLoading,
    error,
  } = useGetUserByIdQuery(userId as string, {
    refetchOnMountOrArgChange: true,
  });

  const [
    verifyUserAccount,
    {
      isLoading: isLoadingVerifyAccount,
      isSuccess: isSuccessVerifyAccount,
      isError: isErrorVerifyAccount,
      error: errorVerifyAccount,
    },
  ] = useVerifyUserAccountMutation();

  const [
    declineVerification,
    {
      isLoading: isLoadingDeclineVerification,
      isError: isErrorDeclineVerification,
      error: errorDeclineVerification,
      isSuccess: isSuccessDeclineVerification,
    },
  ] = useDeclineVerificationRequestMutation();

  useEffect(() => {
    if (isErrorVerifyAccount) {
      console.log(errorVerifyAccount);
      toast.error("Failed to verify user account");
    }

    if (isSuccessVerifyAccount) {
      toast.success("User account verified successfully");
      navigate(-1);
    }
  }, [isErrorVerifyAccount, isSuccessVerifyAccount, errorVerifyAccount]);

  useEffect(() => {
    if (isErrorDeclineVerification) {
      console.log(errorDeclineVerification);
      toast.error("Failed to decline verification request");
    }

    if (isSuccessDeclineVerification) {
      toast.success("Verification request declined successfully");
      navigate(-1);
    }
  }, [
    isErrorDeclineVerification,
    isSuccessDeclineVerification,
    errorDeclineVerification,
  ]);

  const onConfirmHandler = () => {
    verifyUserAccount(userId as string);
  };

  const onDeclineHandler = () => {
    declineVerification(userId as string);
  };

  return (
    <Card className="flex min-h-screen w-full flex-col px-10">
      <div className="flex w-full items-center p-2">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>
      <CardHeader>
        <CardTitle>
          User {user?.firstName} {user?.lastName} request for verification
        </CardTitle>
        <CardDescription>
          <div className="space-y-2">
            <h3 className="font-semibold">Account Verification Process:</h3>
            <p>
              As an admin, you are responsible for reviewing and validating user
              identity details before approving verification requests. The
              verification process involves multiple checks to ensure
              authenticity and compliance with international best practices.
            </p>

            <h3 className="font-semibold">Key Verification Steps:</h3>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>Identity Document Check:</strong> Verify that the
                identity document (passport, national ID, or driver's license)
                is legitimate and unaltered.
              </li>
              <li>
                <strong>Profile Photo Match:</strong> Ensure that the user’s
                profile picture matches the photo on their identity document.
              </li>
              <li>
                <strong>Name Consistency:</strong> Confirm that the full name on
                the identity document matches the name provided during
                registration.
              </li>
              <li>
                <strong>Date of Birth Confirmation:</strong> Cross-check the
                date of birth on the document with the provided details.
              </li>
              <li>
                <strong>Address Verification:</strong> Validate the provided
                address against utility bills or other official documents if
                required.
              </li>
              <li>
                <strong>Phone & Email Authentication:</strong> Ensure that the
                phone number and email are active and belong to the user.
              </li>
              <li>
                <strong>Fraud Prevention Checks:</strong> Look for signs of
                forgery, duplicate accounts, or suspicious activity.
              </li>
            </ul>

            <h3 className="font-semibold">International Standards:</h3>
            <p>
              Our verification process aligns with global best practices used by
              major platforms like:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong>KYC (Know Your Customer):</strong> Used by financial
                institutions to prevent fraud.
              </li>
              <li>
                <strong>GDPR Compliance:</strong> Ensures data protection and
                privacy rights.
              </li>
              <li>
                <strong>Government-Issued ID Verification:</strong> Standard
                practice for social media and fintech platforms (e.g., Facebook,
                Binance, PayPal).
              </li>
            </ul>

            <p>
              If any discrepancies or fraudulent activity are detected, the
              verification request should be rejected, and appropriate actions
              should be taken.
            </p>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <LoadingPage />
        ) : error ? (
          <NotFoundPage>
            <pre>{JSON.stringify(error, null, 2)}</pre>
          </NotFoundPage>
        ) : !user ? (
          <NotFoundPage>
            <p>User not found</p>
          </NotFoundPage>
        ) : (
          <div className="space-y-5">
                  <div className="relative w-full space-y-4 overflow-hidden bg-white px-10">
              <div className="border-b border-gray-200 p-6">
                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Personal Information:
                    </h3>
                    <p className="text-gray-600">
                      <span className="font-semibold">First Name:</span>{" "}
                      {user.firstName}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Last Name:</span>{" "}
                      {user.lastName}
                    </p>
                    {/* username */}
                    <p className="text-gray-600">
                      <span className="font-semibold">Username:</span>{" "}
                      {user.username}
                    </p>
                    <p className="mt-2 text-gray-600">
                      <span className="font-semibold">Date of Birth:</span>{" "}
                      {new Date(user.dateOfBirth).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Gender:</span>{" "}
                      {user.gender}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Email:</span> {user.email}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Phone:</span>{" "}
                      {user.phoneNumber}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      Address:
                    </h3>
                    <p className="text-gray-600">
                      <span className="font-semibold">Country:</span>{" "}
                      {user.address.country}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">City:</span>{" "}
                      {user.address.city}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Subcity:</span>{" "}
                      {user.address.subcity}
                    </p>
                    {user.address.woreda && (
                      <p className="text-gray-600">
                        <span className="font-semibold">Woreda:</span>{" "}
                        {user.address.woreda}
                      </p>
                    )}
                    <p className="text-gray-600">
                      <span className="font-semibold">Street:</span>{" "}
                      {user.address.street}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="grid w-full grid-cols-3">
                  {/* user profile picture */}
                  <div className="">
                    Profile Picture
                    <div className="h-[200px] w-[300px]">
                      <ModalImage
                        small={user.profilePicture}
                        large={user.profilePicture}
                        alt={`${user.firstName} ${user.lastName} profile picture`}
                      />
                    </div>
                  </div>
                  <div className="h-[200px] w-[300px]">
                    <p>The front side of your Identity Card</p>
                    <ModalImage
                      small={user.idPhoto_front}
                      large={user.idPhoto_front}
                      alt={`${user.firstName} ${user.lastName} Identity Photo front side`}
                    />
                  </div>
                  <div className="h-[200px] w-[300px]">
                    The back side of your Identity Card
                    <ModalImage
                      small={user.idPhoto_back}
                      large={user.idPhoto_back}
                      alt={`${user.firstName} ${user.lastName} Identity Photo back side`}
                    />
                  </div>
                </div>
              </div>
            </div>
                  <div className="flex w-full flex-row-reverse items-center justify-start gap-2 space-y-2 px-4 pb-4">
              <Dialog>
                <DialogTrigger asChild>
                        <Button className="mt-2 w-1/2 bg-accent-500/95 text-slate-100 hover:bg-accent-500">
                    Verify User Account
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-200 sm:max-w-[425px]">
                  <DialogHeader>
                          <DialogTitle>Verifiying User Account</DialogTitle>
                        </DialogHeader>
                        <DialogDescription>
                          <span className="font-semibold text-red-500">
                            ⚠ Warning:
                          </span>
                          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-gray-700">
                            <li>
                              Ensure you have thoroughly reviewed the user's documents
                              and identity before proceeding.
                            </li>
                            <li>
                              Account verification is{" "}
                              <span className="font-semibold">permanent</span> and
                              cannot be undone.
                            </li>
                            <li>
                              Any mistakes in verification can lead to unauthorized
                              access or security risks.
                            </li>
                            <li>
                              If you are unsure,{" "}
                              <span className="font-semibold">
                                consult with a senior administrator
                              </span>{" "}
                              before proceeding.
                            </li>
                          </ul>
                          <div className="text-gray-800">
                            Are you sure you want to verify this user?
                          </div>
                        </DialogDescription>
                  <DialogFooter>
                    <Button
                      disabled={isLoadingVerifyAccount}
                            className="bg-accent-500/95 text-white hover:bg-accent-500"
                      onClick={onConfirmHandler}
                    >
                      {isLoadingVerifyAccount ? (
                              <SpinnerMini className="h-5 w-5 " />
                      ) : (
                        "Confirm Verification"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                        <Button className="w-1/2 bg-red-500/95 text-light-100 hover:bg-red-500 disabled:cursor-not-allowed">
                    Decline Verification
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-slate-200 sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Decline User Account</DialogTitle>
                    <DialogDescription>
                            <span className="font-semibold text-red-500">
                        ⚠ Warning:
                      </span>
                      <div className="text-gray-800">
                        Are you sure you want to Decline the verification
                        process of this user?
                      </div>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button
                      onClick={onDeclineHandler}
                      disabled={isLoadingDeclineVerification}
                            className="bg-red-500/95 text-white hover:bg-red-500"
                    >
                      {isLoadingDeclineVerification ? (
                              <SpinnerMini className="h-5 w-5 " />
                      ) : (
                        "Decline Verification"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default UserDetailForVerification;

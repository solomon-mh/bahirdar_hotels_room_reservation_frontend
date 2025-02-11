import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuthContext } from "@/context/AuthContext";
import { useRequestIdentityVerificationMutation } from "@/redux/api/userApi";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function IdentityVerification() {
  const { user } = useAuthContext();

  const [
    requestIdentityVerification,
    { isLoading, isError, isSuccess, error },
  ] = useRequestIdentityVerificationMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Identity verification request submitted successfully.");
    }
    if (isError) {
      console.error(error);
      toast.error("An error occurred. when submitting the request.");
    }
  }, [isSuccess, isError, error]);

  if (!user) return null; // Handle case when user is undefined

  if (user.isOnboarding) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Complete Onboarding
          </CardTitle>
          <CardDescription>
            <p>
              Before proceeding with identity verification, please complete the
              onboarding process. This ensures that your profile information is
              accurate and up to date.
            </p>
            <p className="mt-2">
              Once you finish onboarding, you can return here to verify your
              identity.
            </p>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            to="/account/complete-onboarding"
            className="text-white rounded-md bg-accent-500 px-4 py-2"
          >
            Continue Onboarding
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (user.isVerified)
  {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Account Verified ✅
          </CardTitle>
          <CardDescription>
            <p>
              Your identity has been successfully verified. You can now enjoy
              full access to our platform.
            </p>
            <p className="mt-2">
              If you have any issues, please contact support.
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }


  if (user.isVerificationRequested)
  {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Verification <span
              style={{ color: "#FFA500" }}
            > Pending </span>⏳
          </CardTitle>
          <CardDescription>
            <p>
              Your identity verification request has been submitted and is
              currently under review.
            </p>
            <p className="mt-2">
              This process may take some time. You will be notified once your
              verification is complete.
            </p>
            <p className="mt-2 font-medium">
              If you believe there is an issue, please contact support.
            </p>
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          Identity Verification
        </CardTitle>
        <CardDescription>
          <p>
            To ensure the security of our platform, identity verification is
            required. Before proceeding, please make sure:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-6 text-sm text-gray-600">
            <li>Your profile information is fully completed and up-to-date.</li>
            <li>You have successfully completed the onboarding process.</li>
            <li>
              You have a valid government-issued ID (e.g., passport, driver’s
              license, or national ID card).
            </li>
            <li>
              Your document is clear, readable, and matches your profile
              details.
            </li>
          </ul>
          <p className="mt-3">
            Once submitted, our team will review your request and notify you of
            the verification status.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <button
          disabled={isLoading}
          onClick={async () => requestIdentityVerification()}
          className="text-white rounded-md bg-accent-500/95 hover:bg-accent-500 px-4 py-2 disabled:cursor-not-allowed"
        >
          {isSuccess ? "Request Submitted" : "Request Identity Verification"}
        </button>
      </CardContent>
    </Card>
  );
}

export default IdentityVerification;

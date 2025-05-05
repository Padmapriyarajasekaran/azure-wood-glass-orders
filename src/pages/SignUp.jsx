
import SignupForm from "@/components/auth/SignupForm";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center">
            <Package className="h-10 w-10 text-blue-600" />
            <span className="ml-2 text-2xl font-bold text-gray-900">Plyfind</span>
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create an account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Join us to order premium wood and glass products
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignUp;

import React, { useState } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { isValidEmail } from "../../utils/helper";
import Input from "../../components/ui/Input/Input";
import { Key, Mail, User, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileImageSelector from "../../components/ui/profileImage/ProfileImageSelector";

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState(null);
  const [adminInviteToken, setAdminInviteToken] = useState("");
  const [error, setError] = useState({ email: null, password: null });

  const handleSignUp = async (e) => {
    e.preventDefault();

    let errors = { email: null, password: null };
    let hasError = false;

    if (!isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
      hasError = true;
    }

    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
      hasError = true;
    }

    setError(errors);
    if (hasError) return;

    // API Calls
  };

  return (
    <AuthLayout>
      <div className="md:max-w-10/12 w-full mx-auto">
        <h2 className="text-2xl font-bold mb-2">Create an account</h2>
        <p className="text-gray-600 mb-6">
          Join us today by entering your details below.
        </p>
        <form onSubmit={handleSignUp}>
          <ProfileImageSelector
            image={profileImage}
            setImage={setProfileImage}
          />
          <div className="flex flex-col md:gap-5 gap-5 mb-10">
            <div className="flex md:flex-row flex-col md:items-center md:justify-between md:w-full gap-5">
              <Input
                type="text"
                label="Full Name"
                icon={User}
                placeholder="john"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />

              <Input
                type="email"
                label="Email Address"
                icon={Mail}
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error.email}
              />
            </div>

            <div className="flex md:flex-row flex-col md:items-center md:justify-between md:w-full gap-5">
              <Input
                type="password"
                label="Password"
                icon={Lock}
                placeholder="Min 8 Characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error.password}
              />

              <Input
                type="text"
                label="Admin Invite Token"
                icon={Key}
                placeholder="6 Digit Code"
                value={adminInviteToken}
                onChange={(e) => setAdminInviteToken(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
          >
            SIGN UP
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}

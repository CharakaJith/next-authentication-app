import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ErrorBox from '@/components/errorBox';
import useRegister from '../hooks/useRegister';
import useGet from '../../../enum/hooks/useGet';
import Link from 'next/link';

const RegisterForm: React.FC = () => {
  const { titles, error: titlesError, isError: titlesIsError } = useGet();
  const {
    title,
    firstName,
    lastName,
    email,
    password,
    confrimPassword,
    error: registerError,
    isError: registerIsError,
    setTitle,
    setFirstName,
    setLastName,
    setEmail,
    setPassword,
    setConfrimPassword,
    handleSubmit,
  } = useRegister();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div className="flex w-full items-center justify-center px-5 cursor-default">
      {/* form card */}
      <div className="flex flex-col gap-4 w-full max-w-lg p-6 rounded-2xl bg-white/30 backdrop-blur-md border border-gray-200 shadow-lg">
        {/* form heading */}
        <h2 className="text-2xl font-bold text-center mb-1 text-gray-900">Sign Up</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* title drop down */}
          <select value={title} onChange={(e) => setTitle(e.target.value)} className="border border-gray-300 rounded-md p-2 text-gray-700">
            <option value="" disabled>
              Select Title
            </option>
            {titles?.map((t) => (
              <option key={t.key} value={t.value}>
                {t.value}
              </option>
            ))}
          </select>

          {/* inputs */}
          <Input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" />
          <Input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" />
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <div className="relative">
            <Input type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOffIcon size={25} /> : <EyeIcon size={25} />}
            </button>
          </div>
          <div className="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confrimPassword}
              onChange={(e) => setConfrimPassword(e.target.value)}
              placeholder="Confirm Password"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOffIcon size={25} /> : <EyeIcon size={25} />}
            </button>
          </div>

          {/* errors */}
          {(registerIsError || titlesIsError) && <ErrorBox messages={[...(registerError ?? []), ...(titlesError ?? [])]} />}

          {/* register button */}
          <Button type="submit" className="cursor-pointer w-full bg-gray-700 hover:bg-gray-900 text-white">
            Register
          </Button>

          {/* head to login text */}
          <div className="text-center text-gray-500">
            Already have an account?{' '}
            <span className="relative inline-block group cursor-pointer hover:text-black">
              <Link href="/auth/login">
                Login here.
                <span className="absolute left-0 -bottom-0.5 h-0.5 bg-black w-0 group-hover:w-full transition-all duration-300" />
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

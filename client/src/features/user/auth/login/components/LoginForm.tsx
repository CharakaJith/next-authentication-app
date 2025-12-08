import { useEffect, useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ErrorBox from '@/components/errorBox';
import useLogin from '../hooks/useLogin';
import LoginFormProps from '../props/loginFormProp';

const LoginForm: React.FC<LoginFormProps> = ({ defaultEmail = '' }) => {
  const { email, password, error, isError, setEmail, setPassword, handleSubmit } = useLogin();

  const [showPassword, setShowPassword] = useState(false);

  // prefill email if available
  useEffect(() => {
    if (defaultEmail) setEmail(defaultEmail);
  }, [defaultEmail, setEmail]);

  return (
    <div className="flex w-full items-center justify-center px-5 cursor-default">
      {/* form card */}
      <div className="flex flex-col gap-4 w-full max-w-lg p-6 rounded-2xl bg-white/30 backdrop-blur-md border border-gray-200 shadow-lg">
        {/* form heading */}
        <h2 className="text-2xl font-bold text-center mb-1 text-gray-900">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* inputs */}
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

          {/* error box */}
          {isError && <ErrorBox messages={error} />}

          {/* login button */}
          <Button type="submit" className="cursor-pointer w-full bg-gray-700 hover:bg-gray-900 text-white">
            Login
          </Button>

          {/* forgot password text */}
          <div className="text-center text-gray-500">
            Forgot your password?{' '}
            <span className="relative inline-block group cursor-pointer hover:text-black">
              Reset it here.
              <span className="absolute left-0 -bottom-0.5 h-0.5 bg-black w-0 group-hover:w-full transition-all duration-300" />
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

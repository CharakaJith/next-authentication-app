import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ErrorBox from '@/components/errorBox';
import useLogin from '../hooks/useLogin';

const LoginForm: React.FC = () => {
  const { email, password, error, isError, setEmail, setPassword, handleSubmit } = useLogin();

  return (
    <div className="flex w-full items-center justify-center px-5 cursor-default">
      {/* form card */}
      <div className="flex flex-col gap-4 w-full max-w-lg p-6 rounded-2xl bg-white/30 backdrop-blur-md border border-gray-200 shadow-lg">
        {/* form heading */}
        <h2 className="text-2xl font-bold text-center mb-1 text-gray-900">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* inputs */}
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />

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

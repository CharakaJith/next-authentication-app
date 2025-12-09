import { useState } from 'react';
import ProfileTab from './ProfileTab';
import SettingTab from './SettingTab';
import useGet from '../hooks/useGet';
import { Button } from '@/components/ui/button';
import { DISPLAY } from '@/src/common/messages';
import { InfoIcon, TrashIcon } from 'lucide-react';
import Toast from '@/components/toast';
import { useDispatch } from 'react-redux';
import { clearUserAuth } from '@/src/features/auth/userAuthSlice';
import useLogout from '../../auth/logout/hooks/useLogout';
import { useRouter } from 'next/navigation';
import useDelete from '../../delete/hooks/useDelete';

const ProfileDisplay: React.FC = () => {
  const { user, error, isError } = useGet();

  const [activeTab, setActiveTab] = useState<'profile' | 'settings'>('profile');

  const dispatch = useDispatch();
  const router = useRouter();

  // handle logout
  const { handleUserLogout } = useLogout({
    onSuccess: () => {
      // go to home
      Toast.success(DISPLAY.USER.LOGGED_OUT, {
        icon: <InfoIcon size={25} className="text-green-400" />,
      });
      router.replace('/');

      // clear store
      setTimeout(() => {
        dispatch(clearUserAuth());
      }, 50);
    },
  });

  // handle delete
  const { handleDelete } = useDelete({
    onSuccess: () => {
      // go to home
      Toast.info(DISPLAY.USER.DELETED, {
        icon: <TrashIcon size={25} className="text-red-400" />,
      });
      router.replace('/');

      // clear store
      setTimeout(() => {
        dispatch(clearUserAuth());
      }, 50);
    },
  });

  // handle error
  if (isError) return <div className="p-4 bg-red-100 text-red-700 rounded">Error: {error || 'Failed to load user'}</div>;

  // handle loading
  if (!user) return <div className="p-4 text-gray-500 italic">Loading user...</div>;

  return (
    <div className="w-3xl bg-white p-6 rounded-2xl cursor-default min-h-[680px]">
      {/* header */}
      <div className="flex items-center justify-between mb-6">
        {/* user name */}
        <h1 className="text-2xl font-bold text-gray-900">
          {user.title} {user.firstName} {user.lastName}
        </h1>

        {/* edit button */}
        {activeTab === 'profile' ? (
          <>
            <Button className="px-4 py-2 bg-gray-600 text-white hover:bg-gray-700 rounded-md cursor-pointer">Edit Profile</Button>
          </>
        ) : (
          <></>
        )}
      </div>

      {/* tabs */}
      <div className="flex items-center gap-6 border-b pb-2 mb-6">
        {/* profile button */}
        <button
          className={`pb-2 font-semibold cursor-pointer ${
            activeTab === 'profile' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('profile')}
        >
          Profile
        </button>

        {/* settings button */}
        <button
          className={`pb-2 font-semibold cursor-pointer ${
            activeTab === 'settings' ? 'border-b-2 border-gray-900 text-gray-900' : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('settings')}
        >
          Settings
        </button>
      </div>

      {/* tab content */}
      {activeTab === 'profile' ? <ProfileTab user={user} /> : <SettingTab user={user} onDelete={handleDelete} />}

      {/* logout */}
      {activeTab === 'profile' ? (
        <div className="mt-6 flex justify-end">
          <Button className="px-4 py-2 bg-red-500 text-white hover:bg-red-700 rounded-md cursor-pointer" onClick={handleUserLogout}>
            Logout
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default ProfileDisplay;

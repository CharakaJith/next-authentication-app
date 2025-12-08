import formatDate from '@/src/util/formatDate';
import { ProfileTabProps } from '../props/profileTabProps';

const ProfileTab: React.FC<ProfileTabProps> = ({ user }) => {
  return (
    <>
      {/* basic information */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Basic Information</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <span className="font-semibold">Title</span>
            <p className="text-gray-700 mt-0.5 ml-4">{user.title}</p>
          </div>
          <div>
            <span className="font-semibold">First Name</span>
            <p className="text-gray-700 mt-0.5 ml-4">{user.firstName}</p>
          </div>
          <div>
            <span className="font-semibold">Last Name</span>
            <p className="text-gray-700 mt-0.5 ml-4">{user.lastName}</p>
          </div>
        </div>
      </div>

      {/* contact details */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Contact Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <span className="font-semibold">Email</span>
            <p className="text-gray-700 mt-0.5 ml-4">{user.email}</p>
          </div>
        </div>
      </div>

      {/* account metadata */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800 mb-2">Account Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <span className="font-semibold">Profile ID</span>
            <p className="text-gray-700 mt-0.5 ml-4">{user.displayId}</p>
          </div>
          <div>
            <span className="font-semibold">Last Login</span>
            <p className="text-gray-700 mt-0.5 ml-4">{formatDate(user.lastLogin)}</p>
          </div>
          <div>
            <span className="font-semibold">Registered Date</span>
            <p className="text-gray-700 mt-0.5 ml-4">{formatDate(user.createdAt)}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTab;

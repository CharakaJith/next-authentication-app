import { Button } from '@/components/ui/button';
import { SettingTabProps } from '../props/settingTabProps';
import { useState } from 'react';
import DeleteModal from '../../delete/components/DeleteModal';
import useUpdatePassword from '../../update/password/hooks/useUpdatePassword';
import { Input } from '@/components/ui/input';
import ErrorBox from '@/components/errorBox';

const SettingTab: React.FC<SettingTabProps> = ({ user, onDelete }) => {
  const { currentPassword, newPassword, confirmPassword, error, isError, setCurrentPassword, setNewPassword, setConfirmPassword, handleSubmit } =
    useUpdatePassword({});
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      {/* email */}
      <div className="mb-6">
        <h2 className="text-lg font-bold mb-2">Email</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="md:col-span-2">
            <p className="text-gray-700 mt-0.5 ml-4">
              {user.email} <span className="italic font-medium">(Please contact support to update your email)</span>
            </p>
          </div>
        </div>
      </div>

      {/* update password */}
      <form onSubmit={handleSubmit}>
        <h2 className="text-lg font-bold mb-2">Update Password</h2>

        {/* input fields */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Input type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="Current Password *" />
          <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password *" />
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm Password *" />
        </div>

        {/* error box */}
        <div className="mt-3 mb-3">{isError && <ErrorBox messages={error} />}</div>

        <Button type="submit" variant="destructive" className="bg-green-500 text-white hover:bg-green-600 cursor-pointer">
          Update Password
        </Button>
      </form>

      {/* delete section */}
      <div className="mb-6 mt-6">
        <h2 className="text-lg font-bold text-red-600 mb-2">Delete Account</h2>

        {/* delete button */}
        <Button variant="destructive" className="bg-red-500 text-white hover:bg-red-700 cursor-pointer" onClick={() => setIsDeleteOpen(true)}>
          Delete Account
        </Button>
      </div>

      {isDeleteOpen && <DeleteModal userName={`${user.firstName} ${user.lastName}`} onClose={() => setIsDeleteOpen(false)} onConfirm={onDelete} />}
    </>
  );
};

export default SettingTab;

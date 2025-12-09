import { Button } from '@/components/ui/button';
import { SettingTabProps } from '../props/settingTabProps';
import { useState } from 'react';
import DeleteModal from '../../delete/components/DeleteModal';

const SettingTab: React.FC<SettingTabProps> = ({ user, onDelete }) => {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  return (
    <>
      {/* delete section */}
      <div className="mb-6">
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

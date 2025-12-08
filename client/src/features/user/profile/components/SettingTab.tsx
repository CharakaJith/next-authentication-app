import { SettingTabProps } from '../props/settingTabProps';

const SettingTab: React.FC<SettingTabProps> = ({ user }) => {
  return (
    <div className="mb-6">
      <h2 className="text-lg font-bold text-gray-800 mb-2">Settings</h2>
      <div>
        <span className="font-semibold">Email:</span>
        <p className="text-gray-700 mt-0.5 ml-4">{user.email}</p>
      </div>
    </div>
  );
};

export default SettingTab;

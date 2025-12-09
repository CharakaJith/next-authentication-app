import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import type { DeleteModalProps } from '../props/deleteModalProps';

const DeleteModal: React.FC<DeleteModalProps> = ({ userName, onClose, onConfirm }) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (input.trim() === userName.trim()) {
      onConfirm();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl relative" onClick={(e) => e.stopPropagation()}>
        {/* close icon */}
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-gray-700 cursor-pointer">
          <X size={22} />
        </button>

        {/* title */}
        <h2 className="text-xl font-bold text-red-600 mb-3">Delete Account</h2>

        <p className="text-md text-gray-700 mb-4">
          This action is <span className="font-bold text-red-500">permanent</span> and cannot be undone.
          <br />
          Please type <span className="font-bold">{userName}</span> to confirm:
        </p>

        {/* input */}
        <Input className="mb-3" placeholder={userName} value={input} onChange={(e) => setInput(e.target.value)} />

        {/* action buttons */}
        <div className="flex justify-end gap-3 mt-5">
          {/* cancel button */}
          <Button
            onClick={onClose}
            className="w-[70px] h-8 sm:w-20 sm:h-9 md:w-[84px] md:h-10 bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer"
          >
            Cancel
          </Button>

          {/* submit button */}
          <Button
            variant="destructive"
            className="bg-red-600 text-white hover:bg-red-700 cursor-pointer"
            disabled={input.trim() !== userName.trim()}
            onClick={handleSubmit}
          >
            Confirm Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

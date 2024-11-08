import React, { forwardRef } from 'react';
import { Input } from "../ui/input";

interface FileInputProps {
  onChange: (file: File) => void;
  accept?: string;
  disabled?: boolean
}

// Use forwardRef to handle ref forwarding
const FileInput = forwardRef<HTMLInputElement, FileInputProps>(({ onChange, accept,disabled, ...rest }, ref) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onChange(file);
    }
  };

  return (
    <Input
      type="file"
      onChange={handleFileChange}
      accept={accept}
      disabled={disabled}
      ref={ref}  // Forward ref here
      {...rest}  // Spread other props, but not `ref`
    />
  );
});

FileInput.displayName = 'FileInput';
export default FileInput;

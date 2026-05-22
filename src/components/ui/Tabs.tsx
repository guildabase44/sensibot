import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ value, onValueChange, children, className = '' }) => {
  return (
    <div className={className}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as any, { activeTab: value, onTabChange: onValueChange });
        }
        return child;
      })}
    </div>
  );
};

export const TabsList: React.FC<TabsListProps & { activeTab?: string; onTabChange?: (tab: string) => void }> = ({
  children,
  className = '',
  activeTab,
  onTabChange,
}) => {
  return (
    <div className={`flex gap-2 bg-gray-100 rounded-lg p-1 ${className}`}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as any, { activeTab, onTabChange });
        }
        return child;
      })}
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps & { activeTab?: string; onTabChange?: (tab: string) => void }> = ({
  value,
  children,
  disabled = false,
  activeTab,
  onTabChange,
}) => {
  const isActive = activeTab === value;

  return (
    <button
      onClick={() => {
        if (!disabled && onTabChange) {
          onTabChange(value);
        }
      }}
      disabled={disabled}
      className={`
        px-4 py-2 font-semibold rounded-md transition-all duration-200
        ${isActive ? 'bg-white text-orange-600 shadow-md' : 'text-gray-600 hover:text-gray-900'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}
      `}
    >
      {children}
    </button>
  );
};

export const TabsContent: React.FC<TabsContentProps & { activeTab?: string }> = ({
  value,
  children,
  className = '',
  activeTab,
}) => {
  if (activeTab !== value) return null;

  return <div className={className}>{children}</div>;
};

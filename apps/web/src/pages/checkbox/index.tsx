import { Icon, Icons } from "@repo/ui/icon";

const CheckboxPage = () => {
  return (
    <div className="w-full h-full p-5">
      <div className="grid grid-cols-4 gap-2">
        {Object.keys(Icons).map(icon => (
          <div key={icon} className="flex flex-col gap-3 items-center">
            <Icon iconName={icon as keyof typeof Icons} className="w-10 h-10" />
            <p>{icon}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CheckboxPage;

import { Spinner } from "@repo/ui/spinner";
import AdminRootLayout from "./layouts/root";

const AdminLoading = () => {
  return (
    <AdminRootLayout isLayoutPaddingY={false}>
      <div className="h-[calc(100vh-64px)] lg:h-screen flex items-center justify-center">
        <div className="flex items-center justify-center w-15 h-15 rounded-lg bg-primary">
          <Spinner size="lg" className="text-white" />
        </div>
      </div>
    </AdminRootLayout>
  );
};

export default AdminLoading;

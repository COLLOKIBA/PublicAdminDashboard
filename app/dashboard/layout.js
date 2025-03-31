import SideNav from "./sidenav";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
      {/* Sidebar (Fixed on Left) */}
      <aside className="w-64 bg-gray-900 text-white">
        <SideNav />
      </aside>

      {/* Main Content (Right Side) */}
      <main className="flex-grow p-6 overflow-y-auto">{children}</main>
    </div>
  );
}
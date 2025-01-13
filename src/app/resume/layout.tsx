// import SideNav from "@/app/ui/dashboard/sidenav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pt-24">
      <div className="container">{children}</div>
    </div>
  );
}

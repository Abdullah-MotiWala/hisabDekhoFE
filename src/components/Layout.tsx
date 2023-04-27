import { useAppSelector } from "@/customHooks/hooks";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Swal from "sweetalert2";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (!token && router.pathname !== "/login") {
      Swal.fire({
        title: "Error",
        text: "Please login again",
        icon: "error"
      });
      router.push("/login");
    }
  }, []);
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;

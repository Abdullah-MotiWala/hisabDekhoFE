import { useAppSelector } from "@/customHooks/hooks";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect } from "react";
import { useSelector } from "react-redux";
import swal from "sweetalert";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { token } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (!token && router.pathname !== "/login") {
      swal({
        title: "Error",
        text: "Please login again",
        icon: "error"
      });
      router.push("/login");
    }
  }, []);
  return (
    <main>
      <p>Pakistan</p>
      {children}
    </main>
  );
};

export default Layout;

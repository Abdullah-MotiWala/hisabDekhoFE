import { Layout, Menu, Dropdown } from "antd";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import styles from "./navbar.module.css";
import { useApi, useAppDispatch } from "@/customHooks/hooks";
import { signOut } from "@/store/user";
import { useReducer } from "react";
import { useRouter } from "next/router";
import { apiRoutes } from "../../../constants";
import Swal from "sweetalert2";

const { Header } = Layout;

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  //   util funcs
  const signOutHandler = () => {
    dispatch(signOut());
    router.replace("/login");
  };

  const userDeleteHandler = async () => {
    const { value } = await Swal.fire({
      title: "Are You Sure",
      input: "text",
      inputLabel: "Please copy this: User Name",
      inputValidator: (value) =>
        new Promise(async (resolve) => {
          if (value === "User Name") {
            let response = await useApi({
              isSecure: true,
              method: "DELETE",
              url: apiRoutes.DELETE_USER
            });
            if (response.success) {
              Swal.fire({
                title: "Success",
                text: response.message,
                icon: "success"
              });
              resolve("");
              dispatch(signOut());
              router.push("/login");
            }
          } else {
            resolve("Not Matched");
          }
        })
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => alert("alert")}>
        Edit Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={userDeleteHandler}>
        Delete User
      </Menu.Item>
      <Menu.Item key="3" onClick={signOutHandler}>
        Sign Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className={styles.header}>
      <div>
        <Link href="/" className={styles.logo}>
          logo
        </Link>
      </div>
      <div className={styles.userIcon}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <UserOutlined />
        </Dropdown>
      </div>
    </Header>
  );
};

export default Navbar;

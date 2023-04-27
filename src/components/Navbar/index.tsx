import { Layout, Menu, Dropdown } from "antd";
import Link from "next/link";
import { UserOutlined } from "@ant-design/icons";
import styles from "./navbar.module.css";
import { useApi, useAppDispatch, useAppSelector } from "@/customHooks/hooks";
import { setUser, signOut } from "@/store/user";
import { useRouter } from "next/router";
import { apiRoutes } from "../../../constants";
import Swal from "sweetalert2";

const { Header } = Layout;

const Navbar = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  //   util funcs

  const signOutHandler = () => {
    dispatch(signOut());
    router.replace("/login");
  };

  const userDeleteHandler = async () => {
    const { value } = await Swal.fire({
      title: "Are You Sure",
      input: "text",
      inputLabel: `Please write this : ${user?.name}`,
      inputValidator: (value) => {
        if (value !== user?.name) {
          return "Not Matched";
        }
        return "";
      }
    });
    if (value) {
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
        dispatch(signOut());
        router.push("/login");
      }
    }
  };

  const editUserHandler = async () => {
    if (user) {
      const { value } = await Swal.fire({
        title: "Are You Sure",
        input: "text",
        inputLabel: "Please update value",
        inputValue: user.name,
        showCancelButton: true,
        inputValidator: (value) => {
          if (value === user.name) {
            return "Old name cannot be re-update";
          } else if (value.length < 3) {
            return "Name must be greater than 3 letters";
          } else {
            return "";
          }
        }
      });

      if (value) {
        let response = await useApi({
          isSecure: true,
          method: "PUT",
          url: apiRoutes.EDIT_USER,
          body: { name: value }
        });
        if (response.success) {
          Swal.fire({
            title: "Success",
            text: response.message,
            icon: "success"
          });
          dispatch(setUser({ ...user, name: response.user.name }));
        } else {
          Swal.fire({
            title: "Error",
            text: response.error,
            icon: "error"
          });
        }
      }
    }
  };

  const userVerifyHandler = () => {};

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={editUserHandler}>
        Edit Profile
      </Menu.Item>
      {!user?.isVerified && (
        <Menu.Item key="2" onClick={userVerifyHandler}>
          Confirm Email
        </Menu.Item>
      )}
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
      <Dropdown overlay={menu} trigger={["click"]}>
        <div className={styles.userIcon}>
          <UserOutlined />
        </div>
      </Dropdown>
    </Header>
  );
};

export default Navbar;

import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [adminPassword, setAdminPassword] = useState(
    () => sessionStorage.getItem("adminPassword") || ""
  );

  function login(password) {
    sessionStorage.setItem("adminPassword", password);
    setAdminPassword(password);
  }

  function logout() {
    sessionStorage.removeItem("adminPassword");
    setAdminPassword("");
  }

  const isAuthenticated = Boolean(adminPassword);

  return (
    <AdminAuthContext.Provider value={{ adminPassword, isAuthenticated, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
}
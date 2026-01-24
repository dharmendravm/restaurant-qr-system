import api from "@/lib/api";

export const changePasswordApi = async ({ currentPassword, newPassword }) => {
  const res = await api.post("/user/change-password", {
    currentPassword,
    newPassword,
  });

  return res.data;
};

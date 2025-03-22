import api from "./api"; 

export const fetchDashboardAccounts = async () => {
  try {
    const response = await api.get("/auth/getDashboard");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard accounts:", error);
    throw error;
  }
};

export const deleteDashboardAccount = async (user_id) => {
  try {
    const response = await api.delete(`/auth/deleteDashboard/${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting dashboard account:", error);
    throw error;
  }
};

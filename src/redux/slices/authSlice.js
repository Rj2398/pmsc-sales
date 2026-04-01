import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api.js";
import toast from "react-hot-toast";

// Load stored user from localStorage
const storedUser = JSON.parse(localStorage.getItem("pmsc"));

// Async thunk for sign-in
export const signIn = createAsyncThunk(
  "/student/signIn",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const logout = createAsyncThunk(
  "/student/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.logout();
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getMyDetails = createAsyncThunk(
  "/anything/clever",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getMyDetails(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getTermsCondition = createAsyncThunk(
  "/anything/getTermsCondition",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getTermsCondition(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getPrivacyPolicy = createAsyncThunk(
  "/anything/getPrivacyPolicy",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getPrivacyPolicy(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getReportDownloadData = createAsyncThunk(
  "/anything/getReportDownloadData",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getReportDownloadData(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

export const getEarnedCertificate = createAsyncThunk(
  "/anything/getEarnedCertificate",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.getEarnedCertificate(formData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: error.message }
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: !!storedUser,
    user: storedUser || null,
    isAlreadyVisited: null,
    termsData: null,
    privacyData: null,
    reportData: null,
    earnCertificateData: null,
    loading: false,
    reportLoading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("pmsc");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signIn.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.isAuthenticated = true;
        localStorage.setItem("pmsc", JSON.stringify(action.payload?.user));
        localStorage.setItem("classLevel", action.payload?.user?.level_id || 2);
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        toast.error(
          action.payload?.message || "Login failed. Please try again."
        );
        state.error = action.payload?.message || "Failed to sign in.";
      })

      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        toast.success("Logout Successfully...");
        localStorage.removeItem("pmsc");
        localStorage.removeItem("classLevel");
        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        toast.success("Logout Successfully...");
        localStorage.removeItem("pmsc");
        localStorage.removeItem("classLevel");

        setTimeout(() => {
          window.location.href = "/";
        }, 1000);
      })

      .addCase(getMyDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload?.user;
        state.isAuthenticated = true;
        if (action.payload?.user?.read_status == 0) {
          state.isAlreadyVisited = true;
        } else {
          state.isAlreadyVisited = false;
        }
        localStorage.setItem("pmsc", JSON.stringify(action.payload?.user));
        localStorage.setItem("classLevel", action.payload?.user?.level_id || 2);
      })

      .addCase(getMyDetails.rejected, (state, action) => {
        state.loading = false;
        toast.error(
          action.payload?.message || "Login failed. Please try again."
        );
        state.error = action.payload?.message || "Failed to sign in.";
      })

      .addCase(getTermsCondition.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTermsCondition.fulfilled, (state, action) => {
        state.loading = false;
        state.termsData = action.payload?.data;
      })
      .addCase(getTermsCondition.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(getPrivacyPolicy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPrivacyPolicy.fulfilled, (state, action) => {
        state.loading = false;
        state.privacyData = action.payload?.data;
      })
      .addCase(getPrivacyPolicy.rejected, (state, action) => {
        state.loading = false;
      })

      .addCase(getReportDownloadData.pending, (state) => {
        state.reportLoading = true;
        state.error = null;
      })
      .addCase(getReportDownloadData.fulfilled, (state, action) => {
        state.reportLoading = false;
        state.reportData = action.payload?.data;
      })
      .addCase(getReportDownloadData.rejected, (state, action) => {
        state.reportLoading = false;
      })

      .addCase(getEarnedCertificate.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEarnedCertificate.fulfilled, (state, action) => {
        state.loading = false;
        state.earnCertificateData = action.payload?.certificates;
      })
      .addCase(getEarnedCertificate.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;

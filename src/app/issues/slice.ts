import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Issue, issueFactory } from './model/issue';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { environment } from 'src/environments/environment';
import { getToken } from '../auth/auth-utils';

const getAuthHeader = () => {
  const token = getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  };
};

// Define a type for the slice state
interface IssueTrackerState {
  issues: Issue[];
}

// Define the initial state using that type
const initialState: IssueTrackerState = {
  issues: [],
};

export const fetchIssues = createAsyncThunk('issues/fetch', async () => {
  const response = await fetch(
    `${environment.API_URL}/issues`,
    getAuthHeader()
  );
  const resp = await response.json();
  return (resp.issues as Issue[]) || [];
});

export const storeIssues = createAsyncThunk(
  'issues/fetch',
  async (_arg, { getState }) => {
    const state = getState() as RootState;
    const issues = state.issueTracker.issues;

    await fetch(`${environment.API_URL}/issues`, {
      method: 'POST',
      body: JSON.stringify({ issues }),
      ...getAuthHeader(),
    }).then((res) => res.json());
  }
);

export const issueTrackerSlice = createSlice({
  name: 'issues',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add: (state) => {
      state.issues.push(issueFactory());
    },
    remove: (state, action: PayloadAction<string>) => {
      state.issues = state.issues.filter(
        (issue) => issue.id !== action.payload
      );
    },
    update: (state, action: PayloadAction<Issue>) => {
      state.issues = state.issues.map((issue) =>
        issue.id === action.payload.id ? action.payload : issue
      );
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      // Add user to the state array
      state.issues = action.payload;
    });
    builder.addCase(fetchIssues.rejected, (state, action) => {
      // Add user to the state array
      // error
    });
  },
});

export const { add, remove, update } = issueTrackerSlice.actions;

const issuesSelector = (state: RootState) => state.issueTracker.issues;

export const useIssues = () => useAppSelector(issuesSelector);

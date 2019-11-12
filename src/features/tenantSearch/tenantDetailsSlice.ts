import { createSlice, PayloadAction } from 'redux-starter-kit';

import { getTenantDetails, TenantDetails } from 'api/cumulocityAPI';
import { AppThunk } from 'app/store';

interface tenantDetailsState {
  managedObjectCount: number;
  error: string | undefined;
}

const initialState: tenantDetailsState = {
  managedObjectCount: -1,
  error: undefined
};

const tenantDetails = createSlice({
  name: 'tenantDetails',
  initialState,
  reducers: {
    getTenantDetailsSuccess(state, action: PayloadAction<TenantDetails>) {
      state.managedObjectCount = action.payload.managedObjectCount;
      state.error = undefined;
    },
    getTenantDetailsFailed(state, action: PayloadAction<string>) {
      state.managedObjectCount = -1;
      state.error = action.payload;
    }
  }
});

export const { getTenantDetailsSuccess, getTenantDetailsFailed } = tenantDetails.actions;

export default tenantDetails.reducer;

export const fetchManagedObjectCount = (): AppThunk => async dispatch => {
  try {
    const tenantDetails = await getTenantDetails();
    dispatch(getTenantDetailsSuccess(tenantDetails));
  } catch (err) {
    dispatch(getTenantDetailsFailed(err.toString()));
  }
};

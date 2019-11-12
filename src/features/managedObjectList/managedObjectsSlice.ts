import { createSlice, PayloadAction } from 'redux-starter-kit';
import { IManagedObject } from '@c8y/client';

import {
  getManagedObject,
  getManagedObjects,
  ManagedObjectsResult,
  Paging
} from 'api/cumulocityAPI';
import { AppThunk } from 'app/store';

interface ManagedObjectsState {
  managedObjectsByIds: Record<string, IManagedObject>;
  currentPageManagedObjects: string[];
  pageCount: number;
  paging: Paging | undefined;
  isLoading: boolean;
  error: string | undefined;
}

const initialState: ManagedObjectsState = {
  managedObjectsByIds: {},
  currentPageManagedObjects: [],
  pageCount: 0,
  paging: undefined,
  isLoading: false,
  error: undefined
};

const managedObjects = createSlice({
  name: 'managedObjects',
  initialState,
  reducers: {
    getManagedObjectStart: startLoading,
    getManagedObjectsStart: startLoading,
    getManagedObjectSuccess(state, { payload }: PayloadAction<IManagedObject>) {
      const { id } = payload;

      state.managedObjectsByIds[id] = payload;
      state.isLoading = false;
      state.error = undefined;
    },
    getManagedObjectsSuccess(state, { payload }: PayloadAction<ManagedObjectsResult>) {
      const { managedObjects, pageCount, paging } = payload;

      state.pageCount = pageCount;
      state.paging = paging;
      state.isLoading = false;
      state.error = undefined;

      managedObjects.forEach(managedObject => {
        state.managedObjectsByIds[managedObject.id] = managedObject;
      });

      state.currentPageManagedObjects = managedObjects.map(managedObject => managedObject.id);
    },
    getManagedObjectFailure: loadingFailed,
    getManagedObjectsFailure: loadingFailed
  }
});

function startLoading(state: ManagedObjectsState) {
  state.isLoading = true;
}

function loadingFailed(state: ManagedObjectsState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

export const {
  getManagedObjectStart,
  getManagedObjectsStart,
  getManagedObjectSuccess,
  getManagedObjectsSuccess,
  getManagedObjectFailure,
  getManagedObjectsFailure
} = managedObjects.actions;

export default managedObjects.reducer;

export const fetchManagedObjects = (page?: number): AppThunk => async dispatch => {
  try {
    dispatch(getManagedObjectsStart());
    const managedObjects = await getManagedObjects(page);
    dispatch(getManagedObjectsSuccess(managedObjects));
  } catch (err) {
    const { data } = err;
    dispatch(getManagedObjectsFailure(data ? data.message : err.toString()));
  }
};

export const fetchManagedObject = (id: string): AppThunk => async dispatch => {
  try {
    dispatch(getManagedObjectStart());
    const managedObject = await getManagedObject(id);
    dispatch(getManagedObjectSuccess(managedObject));
  } catch (err) {
    const { data } = err;
    dispatch(getManagedObjectFailure(data ? data.message : err.toString()));
  }
};

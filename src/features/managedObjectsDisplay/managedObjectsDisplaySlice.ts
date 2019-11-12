import { createSlice, PayloadAction } from 'redux-starter-kit';

interface CurrentDisplay {
  displayType: 'master' | 'detail';
  managedObjectId: string | undefined;
}

interface CurrentDisplayPayload {
  displayType: 'master' | 'detail';
  managedObjectId?: string;
}

type CurrentDisplayState = {
  page: number;
} & CurrentDisplay;

const initialState: CurrentDisplayState = {
  page: 1,
  displayType: 'master',
  managedObjectId: undefined
};

const managedObjectsDisplaySlice = createSlice({
  name: 'managedObjectsDisplay',
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setCurrentDisplayType(state, action: PayloadAction<CurrentDisplayPayload>) {
      const { displayType, managedObjectId } = action.payload;

      state.displayType = displayType;
      state.managedObjectId = managedObjectId;
    }
  }
});

export const { setCurrentDisplayType, setCurrentPage } = managedObjectsDisplaySlice.actions;

export default managedObjectsDisplaySlice.reducer;

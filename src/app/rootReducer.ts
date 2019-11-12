import { combineReducers } from 'redux-starter-kit';

import managedObjectsDisplaySlice from 'features/managedObjectsDisplay/managedObjectsDisplaySlice';
import managedObjectsSlice from 'features/managedObjectList/managedObjectsSlice';
import tenantDetailsSlice from 'features/tenantSearch/tenantDetailsSlice';

const rootReducer = combineReducers({
  tenantDetails: tenantDetailsSlice,
  managedObjectsDisplay: managedObjectsDisplaySlice,
  managedObjects: managedObjectsSlice
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

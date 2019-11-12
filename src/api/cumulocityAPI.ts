import { Client, BasicAuth, IManagedObject, Paging as C8YPaging } from '@c8y/client';

const baseUrl = '';
const token = '';

export type Paging = Pick<
  C8YPaging<IManagedObject>,
  'currentPage' | 'nextPage' | 'prevPage' | 'pageSize' | 'totalPages'
>;

export interface TenantDetails {
  managedObjectCount: number;
}

export interface ManagedObjectsResult {
  managedObjects: IManagedObject[];
  pageCount: number;
  paging: Paging | undefined;
}

export async function getTenantDetails() {
  try {
    const inventoryService = await getInventoryService();
    const { paging } = await inventoryService.list({ pageSize: 1 });

    return {
      managedObjectCount: paging ? paging.totalPages : 0
    };
  } catch (err) {
    throw err;
  }
}

export async function getManagedObjects(page = 1): Promise<ManagedObjectsResult> {
  try {
    const inventoryService = await getInventoryService();
    const { data, paging } = await inventoryService.list({
      pageSize: 25,
      currentPage: page
    });

    let pg = undefined;
    if (paging) {
      const { currentPage, nextPage, prevPage, pageSize, totalPages } = paging;
      pg = { currentPage, nextPage, prevPage, pageSize, totalPages };
    }

    return {
      paging: pg,
      pageCount: paging ? paging.totalPages : 0,
      managedObjects: data
    };
  } catch (err) {
    throw err;
  }
}

export async function getManagedObject(id: string) {
  try {
    const inventoryService = await getInventoryService();
    const { data } = await inventoryService.detail(id);

    return data;
  } catch (err) {
    throw err;
  }
}

async function getInventoryService() {
  const injectedServices = await (window as any).GET_INJECTED_SERVICES();

  return injectedServices ? injectedServices[0] : (await getClient()).inventory;
}

let client$$: Client;
async function getClient() {
  if (client$$) {
    return client$$;
  }

  client$$ = await new Client(new BasicAuth({ token }), baseUrl);

  return client$$;
}
